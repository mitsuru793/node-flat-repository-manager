import { chdirBack, fuzzyMatch } from './util'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

export interface ProjectSet {
  [key: string]: Project[]
}

export default class Project {
  public readonly path: string
  public readonly name: string
  public readonly category: string

  public constructor(props: Readonly<Project>) {
    this.path = props.path
    this.name = props.name
    this.category = props.category
  }

  public hasRemote(): boolean {
    let hasRemote = false
    chdirBack(this.path, () => {
      hasRemote = this.hasGit() && execSync('git remote').length > 0
    })
    return hasRemote
  }

  public hasGit(): boolean {
    return existsSync(join(this.path, '.git'))
  }
}

interface Keywords {
  name: string
  category: string
}

export function matchFilter(
  projects: Project[],
  keywords: Keywords
): Project[] {
  return projects.filter((project: Project) => {
    let matched = fuzzyMatch(project.category, keywords.category)
    if (keywords.name) {
      matched = matched && fuzzyMatch(project.name, keywords.name)
    }
    return matched
  })
}
