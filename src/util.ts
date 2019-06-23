import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import Project from './Project'

if (!process.env.HOME) {
  throw new Error('Undefined env HOME.')
}

const home = process.env.HOME
const separator = '-'

export { home, separator }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(something: any): void {
  // eslint-disable-next-line no-console
  console.log(something)
}

export function execOutputSync(cmd: string): void {
  const result = execSync(cmd)
    .toString()
    .trim()
  log(result)
}

export function readProjects(root: string): Project[] {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(dir => {
      const segments = dir.name.split(separator)

      let name = ''
      let category = ''
      if (segments.length < 2) {
        name = segments[0]
        category = ''
      } else {
        name = segments.slice(1).join(separator)
        category = segments[0]
      }
      return new Project({
        path: path.join(root, dir.name),
        name,
        category
      })
    })
}

export function mapWithCategory(
  projects: Project[]
): { [key: string]: Project[] } {
  return projects.reduce((sorted, p) => {
    if (!p.category) return sorted
    if (!sorted[p.category]) {
      sorted[p.category] = [p]
    } else {
      sorted[p.category].push(p)
    }
    return sorted
  }, {})
}
