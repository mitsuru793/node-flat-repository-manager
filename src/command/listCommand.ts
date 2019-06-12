import {
  home,
  log,
  mapWithCategory,
  readProjects,
  renderProjects
} from '../util'

export function listCommand(): void {
  const sorted = mapWithCategory(readProjects(`${home}/project`))
  log(renderProjects(sorted))
}
