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
