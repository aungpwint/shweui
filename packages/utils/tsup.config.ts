import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: true,
    clean: true,
    format: ['esm'],
    external: ['vue'],
    dts: true,
    minify: true
})
