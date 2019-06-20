import {execSync} from 'child_process'
import {mkdirSync} from 'fs'
import tmpDir = require('temp-dir')
import rimraf = require('rimraf')

const root = `${tmpDir}/projects`

function cli(args: string = ''): string {
  const cmd = `NODE_ENV=debug ts-node ${__dirname}/../../index.ts --projectsRoot ${root} ${args}`
  return execSync(cmd).toString()
}

describe('list command', () => {
  beforeEach(() => {
    rimraf.sync(root)
    mkdirSync(root)

    const projectDirs = ['php-hello', 'php-world', 'node-hi']
    projectDirs.forEach(p => {
      mkdirSync(`${root}/${p}`)
    })
  })

  it('lists success', async () => {
    expect(tmpDir).toBeTruthy()
    const out = cli('list')
    expect(out).toMatchSnapshot()
  })
})

