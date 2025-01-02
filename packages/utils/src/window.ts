interface OpenWindowOptions {
    noopener?: boolean
    noreferrer?: boolean
    target?: '_blank' | '_parent' | '_self' | '_top' | string
}

function openWindow(url: string, options: OpenWindowOptions = {}): void {
    const { noopener = true, noreferrer = true, target = '_blank' } = options

    const features = [noopener && 'noopener=yes', noreferrer && 'noreferrer=yes']
        .filter(Boolean)
        .join(',')

    window.open(url, target, features)
}

export { openWindow }
