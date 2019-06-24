import { Command } from 'commander'
import { listCommand } from './command/listCommand'
import { searchCommand } from './command/searchCommand'

const env = process.env.NODE_ENV || 'dev'

const program: Command = new Command()

const desc = program.description
// @ts-ignore
program.description = (str: string): Command => desc(str.trim())

program.version('1.0.0')

program
  .command('list')
  .option(
    '-p, --projectsRoot <path>',
    'Root path where you put project directories.'
  )
  .option('--no-has-remote', 'Filter projects does not have remote.')
  .description('List projects each category.')
  .action(listCommand)

program
  .command('search:path')
  .option(
    '-p, --projectsRoot <path>',
    'Root path where you put project directories.'
  )
  .description('Search project and copy its absolute path to clipboard.')
  .action(searchCommand)

async function run(): Promise<void> {
  program.parse(process.argv)
}

if (env === 'debug') {
  run()
}

export { run }
