import { fuzzyMatch } from './util'

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
