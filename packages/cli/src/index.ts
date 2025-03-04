#!/usr/bin/env node
import { Command } from 'commander'

import packageJson from '../package.json'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
    const program = new Command()
        .name('shweui')
        .description('add components and dependencies to your project')
        .version(packageJson.version || '1.0.0', '-v, --version', 'display the version number')

    program.parse()
}

main()
