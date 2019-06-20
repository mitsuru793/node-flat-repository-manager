import * as React from "react"
import {render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {mapWithCategory, readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"

export function listCommand(options: GlobalOptions): void {
  const {projectsRoot} = options
  const projectsSet = mapWithCategory(readProjects(projectsRoot))
  render(<CategorizedProjects projectsSet={projectsSet}/>)
}
