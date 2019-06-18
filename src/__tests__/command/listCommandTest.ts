import { execSync } from 'child_process'
import { mkdirSync } from 'fs'
import tmpDir = require('temp-dir')
import rimraf = require('rimraf')

function cli(args: string = ''): string {
  const cmd = `NODE_ENV=debug ts-node ${__dirname}/../../index.ts --projectsRoot ${tmpDir} ${args}`
  return execSync(cmd).toString()
}

describe('list command', () => {
  beforeEach(() => {
    rimraf.sync(`${tmpDir}/*`)

    const projectDirs = ['php-hello', 'php-world', 'node-hi']
    projectDirs.forEach(p => {
      mkdirSync(`${tmpDir}/${p}`)
    })
  })

  it('lists success', async () => {
    const out = cli('list')
    expect(out).toMatchSnapshot()
  })
})
