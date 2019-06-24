import * as React from "react"
import {render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"

type Options = GlobalOptions & {
  hasRemote: boolean
}

export function listCommand(options: Options): void {
  const {projectsRoot} = options
  let projects = readProjects(projectsRoot)
  if (!options.hasRemote) {
    projects = projects.filter(p => !p.hasRemote())
  }
  render(<CategorizedProjects projects={projects}/>)
}
