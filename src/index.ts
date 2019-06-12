import { Command } from 'commander'
import { listCommand } from './command/listCommand'

const env = process.env.NODE_ENV || 'dev'

const program: Command = new Command()

const desc = program.description
// @ts-ignore
program.description = (str: string): Command => desc(str.trim())

program.version('1.0.0')

program
  .command('list')
  .description('List projects each category.')
  .action(listCommand)

async function run(): Promise<void> {
  program.parse(process.argv)
}

if (env === 'debug') {
  run()
}

export { run }
