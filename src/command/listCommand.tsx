import * as React from "react"
import {render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"

type Options = GlobalOptions & {
  hasRemote: boolean
  commitYet: boolean
}

export function listCommand(options: Options): void {
  const {projectsRoot} = options
  let projects = readProjects(projectsRoot)

  projects = projects.filter(p => {
    let match = true

    if (!options.hasRemote) {
      match = !p.hasRemote()
    }

    if (options.commitYet) {
      match = match && !p.hasCommitted()
    }

    return match
  })

  render(<CategorizedProjects projects={projects}/>)
}
