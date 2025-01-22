import { join } from 'path'
import serve from 'electron-serve'
import { app, shell, BrowserWindow, ipcMain, IpcMainInvokeEvent, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { menu } from './menu'
// @ts-ignore (define in dts)
import icon from '../resources/icon.png?asset'

const isDev = is.dev //process.env.NODE_ENV === 'development'

const preload = join(__dirname, '../preload/index.mjs')
const renderer = join(__dirname, '../renderer')

// Use electron-serve to load the app
const loadURL = serve({ directory: renderer })

let mainWindow: BrowserWindow

function createMainWindow(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: true,
            sandbox: false
        }
    })

    loadApplication()

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', () => {
        mainWindow = null!
    })

    // Test actively push message to the Electron-Renderer
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)

        return { action: 'deny' }
    })
}

function loadApplication() {
    if (isDev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

        // Open the DevTools if in development
        if (process.env['ELECTRON_OPEN_DEV_TOOLS']) {
            mainWindow.webContents.openDevTools()
        }
    } else {
        loadURL(mainWindow)
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId(app.getName())

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    if (!app.requestSingleInstanceLock()) {
        app.quit()
        process.exit(0)
    }

    Menu.setApplicationMenu(menu)

    createMainWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('second-instance', () => {
    if (mainWindow) {
        // Focus on the main window if the user tried to open another
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', function () {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createMainWindow()
    }
})

// IPC listener for reload command
ipcMain.on('reload-app', () => {
    loadApplication()
})

ipcMain.handle('open-browser', (_event: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url)
})

// IPC test
ipcMain.on('ping', () => console.log('pong'))

ipcMain.on('message', async (event, arg) => {
    event.reply('message', arg)
})

ipcMain.handle('set-proxy', (_event: IpcMainInvokeEvent, data: any) => {
    if (!mainWindow) return
    const { mode, protocol, host, port } = data
    switch (mode) {
        case 'os':
            console.log('Using system proxy')
            mainWindow.webContents.session.setProxy({ mode: 'system' })
            break
        case 'manual':
            console.log(`Using proxy: ${protocol}=${host}:${port}`)
            mainWindow.webContents.session.setProxy({
                proxyRules: `${protocol}=${host}:${port}`
            })
            break
        default:
            console.log('No proxy configuration')
            mainWindow.webContents.session.setProxy({ mode: 'direct' })
            break
    }
})
