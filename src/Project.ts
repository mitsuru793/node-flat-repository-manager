import { chdirBack, fuzzyMatch } from './util'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

export interface ProjectSet {
  [key: string]: Project[]
}

interface ProjectProps {
  path: string
  name: string
  category: string
}

export default class Project {
  public readonly path: string
  public readonly name: string
  public readonly category: string

  public constructor(props: ProjectProps) {
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

  public hasCommitted(): boolean {
    let has = false
    chdirBack(this.path, () => {
      has = this.hasGit() && execSync('git status --short').length <= 0
    })
    return has
  }

  public hasPushed(): boolean {
    let has = false
    chdirBack(this.path, () => {
      has = this.hasGit() &&
        execSync('git remote -v').length > 0 &&
        execSync('git log origin/master..master').length <= 0
    })
    return has
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
