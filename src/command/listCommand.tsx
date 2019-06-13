import * as React from "react"
import {render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {home, mapWithCategory, readProjects} from "../util"

export function listCommand(): void {
  const projectsSet = mapWithCategory(readProjects(`${home}/project`))
  render(<CategorizedProjects projectsSet={projectsSet}/>)
}
