import * as React from "react"
import {render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"

export function listCommand(options: GlobalOptions): void {
  const {projectsRoot} = options
  const projects = readProjects(projectsRoot)
  render(<CategorizedProjects projects={projects}/>)
}
