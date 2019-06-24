import * as React from "react"
import {Color, Text} from "ink"
import Project from "../Project"
import {mapWithCategory} from "../util"

interface Props {
  projects: Project[]
  firstHighlight?: boolean
}

export function CategorizedProjects(props: Props) {
  const {projects, firstHighlight} = props

  const projectsEachCategory = mapWithCategory(projects)
  let highlighted = false
  const lines = []
  let i = 0
  for (let category in projectsEachCategory) {
    lines.push(<Text key={i++}>{category}</Text>)
    projectsEachCategory[category].map((project: Project) => {
      let text
      if (firstHighlight && !highlighted) {
        text = <Color blue key={i++}> * {project.name}</Color>
        highlighted = true
      } else {
        text = <Text key={i++}> * {project.name}</Text>
      }
      lines.push(text)
    })
  }

  return <div>{lines}</div>
}
