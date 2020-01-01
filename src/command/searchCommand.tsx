import * as React from "react"
import {AppContext, Box, render} from "ink"
import {CategorizedProjects} from "../components/CategorizedProjects"
import {log, readProjects} from "../util"
import {GlobalOptions} from "./GlobalOptions"
import {SearchQuery} from "../components/SearchQuery"
import Project, {matchFilter} from "../Project"

const clipboardy = require('clipboardy')

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
  projects: Project[]
  filtered: Project[]
  searching: boolean
  exit: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const {projectsRoot} = props
    const projects = readProjects(projectsRoot)

    this.state = {
      query: '',
      projects,
      filtered: projects,
      searching: true,
      exit: false,
    }
  }

  onChange = (query: string) => {
    const [searchCategory, searchName] = query.split(/\s+/)
    const {projects} = this.state

    const filtered = matchFilter(projects, {name: searchName, category: searchCategory})
    this.setState({query, filtered})
  }

  onSubmit = () => {
    const {filtered} = this.state
    const selectedList = filtered.flat()
    if (selectedList.length < 1) {
      return
    }

    const path = selectedList[0].path
    log(path)
    clipboardy.writeSync(path)
    this.props.onExit()
  }

  render() {
    return (
      <Box flexDirection="column">
        <CategorizedProjects projects={this.state.filtered} firstHighlight={true}/>
        <SearchQuery query={this.state.query} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </Box>
    )
  }
}
