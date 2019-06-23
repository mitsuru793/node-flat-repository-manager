import * as React from "react"
import {Color, Text} from "ink"
import {ProjectSet} from "../Project"

interface Props {
  projectsSet: ProjectSet
  firstHighlight?: boolean
}

export function CategorizedProjects(props: Props) {
  const {projectsSet, firstHighlight} = props

  let highlighted = false
  const lines = []
  let i = 0
  for (let category in projectsSet) {
    lines.push(<Text key={i++}>{category}</Text>)
    projectsSet[category].map((project) => {
      let text
      if (firstHighlight && !highlighted) {
        text = <Color blue key={i++}>  * {project.name}</Color>
        highlighted = true
      } else {
        text = <Text key={i++}>  * {project.name}</Text>
      }
      lines.push(text)
    })
  }

  return <div>{lines}</div>
}
