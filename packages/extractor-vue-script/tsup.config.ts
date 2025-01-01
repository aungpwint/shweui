import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    clean: true,
    splitting: true,
    format: ['esm'],
    external: ['@unocss/core'],
    dts: true,
    minify: true
})
