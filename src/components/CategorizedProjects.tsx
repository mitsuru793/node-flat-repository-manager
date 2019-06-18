import * as React from "react"
import {Text} from "ink"
import {ProjectSet} from "../Project"


export function CategorizedProjects(props: { projectsSet: ProjectSet }) {
  const {projectsSet} = props
  const lines = []
  let i = 0

  for (let category in projectsSet) {
    lines.push(<Text key={i++}>{category}</Text>)
    projectsSet[category].map((project) => {
      lines.push(<Text key={i++}>  * {project.name}</Text>)
    })
  }

  return <div>{lines}</div>
}
