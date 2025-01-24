import type { Plugin } from 'vite'

export function generateFavicon(): Plugin {
    function deleteLine(html: string, search: string): string {
        const lines = html.split('\n')
        const index = lines.findIndex((line) => line.includes(search))
        if (index >= 0) {
            lines.splice(index, 1)
        }
        return lines.join('\n')
    }

    return {
        name: 'ui:generate-favicon',
        transformIndexHtml(html) {
            return deleteLine(html, 'type="image/x-icon" lang="en"')
        }
    }
}
