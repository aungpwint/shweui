import {
    screen,
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    Display
} from 'electron'
import Store from 'electron-store'

// Create window with state persistence
export const createWindow = (
    windowName: string,
    options: BrowserWindowConstructorOptions
): BrowserWindow => {
    const key = 'window-state'
    const name = `window-state-${windowName}`
    const store = new Store<Rectangle>({ name })

    const defaultSize: Rectangle = {
        width: options.width || 800, // Fallback default size
        height: options.height || 600,
        x: 0, // Set default position if required
        y: 0
    }

    let state: Partial<Rectangle> = {}

    const restore = (): Rectangle => store.get(key, defaultSize)

    const getCurrentPosition = (): Rectangle => {
        const position = win.getPosition()
        const size = win.getSize()
        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        }
    }

    const windowWithinBounds = (windowState: Rectangle, bounds: Rectangle): boolean => {
        return (
            windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height
        )
    }

    const resetToDefaults = (): Rectangle => {
        const bounds = screen.getPrimaryDisplay().bounds
        return {
            ...defaultSize,
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2
        }
    }

    const ensureVisibleOnSomeDisplay = (windowState: Rectangle): Rectangle => {
        const visible = screen.getAllDisplays().some((display: Display) => {
            return windowWithinBounds(windowState, display.bounds)
        })
        if (!visible) {
            // Window is partially or fully not visible, reset to defaults.
            return resetToDefaults()
        }
        return windowState
    }

    const saveState = (): void => {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition())
        }
        store.set(key, state)
    }

    // Restore and ensure window is visible on some display
    state = ensureVisibleOnSomeDisplay(restore())

    // Create browser window with restored or default state
    const win = new BrowserWindow({
        ...state,
        ...options,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences
        }
    })

    win.on('close', saveState)

    return win
}
