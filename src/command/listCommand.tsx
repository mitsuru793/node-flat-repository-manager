import * as React from "react"
import {render} from "ink"
import {ProjectsSet} from "../ProjectsSet"
import {home, mapWithCategory, readProjects} from "../util"

export function listCommand(): void {
  const projectsSet = mapWithCategory(readProjects(`${home}/project`))
  render(<ProjectsSet projectsSet={projectsSet}/>)
}
