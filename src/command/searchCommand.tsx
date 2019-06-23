import * as React from "react"
import {AppContext, Box, render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {log, mapWithCategory, readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"
import {SearchQuery} from "../components/SearchQuery"
import Project, {ProjectSet} from "../Project"

const clipboardy = require('clipboardy');

export function searchCommand(options: GlobalOptions): void {
  const {projectsRoot} = options
  render(
    <AppContext.Consumer>
      {({exit}) => (
        <App projectsRoot={projectsRoot} onExit={exit}/>
      )}
    </AppContext.Consumer>
    )
}

interface Props {
  projectsRoot: string
  onExit: (error?: Error) => void
}

interface State {
  query: string
  projectsSet: ProjectSet
  filteredSet: ProjectSet
  searching: boolean
  exit: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const {projectsRoot} = props
    const projectsSet = mapWithCategory(readProjects(projectsRoot))

    this.state = {
      query: '',
      projectsSet,
      filteredSet: {...projectsSet},
      searching: true,
      exit: false,
    }
  }

  onChange = (query: string) => {
    const [searchCategory, searchName] = query.split(/\s+/)
    const {projectsSet} = this.state

    const newSet = {}
    for (let [category, projects] of Object.entries(projectsSet)) {
      const filtered = projects.filter((project: Project) => {
        let matched =  project.category.match(searchCategory)
        if (searchName) {
          matched = matched && project.name.match(searchName)
        }
        return matched
      })
      if (filtered.length > 0) {
        newSet[category] = filtered
      }
    }

    this.setState({query, filteredSet: newSet})
  }

  onSubmit = () => {
    const {filteredSet} = this.state
    const selectedList = Object.values(filteredSet).flat()
    const last = selectedList.length - 1
    const path = selectedList[last].path
    log(path)
    clipboardy.writeSync(path)
    this.props.onExit()
  }

  render() {
    return (
      <Box flexDirection="column">
        <CategorizedProjects projectsSet={this.state.filteredSet}/>
        <SearchQuery query={this.state.query} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </Box>
    )
  }
}
