import { defineConfig } from 'tsup'

export default defineConfig(() => {
    return {
        entry: ['src/index.ts', 'src/helper.ts'],
        splitting: true,
        clean: true,
        format: ['esm'],
        external: ['unocss'],
        dts: true,
        minify: true
    }
})
