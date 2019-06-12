import { home, log, readProjects, readTemplate } from '../util'
import Mustache = require('mustache')

export function listCommand(): void {
  const sorted = readProjects(`${home}/project`).reduce((sorted, p) => {
    if (!p.category) return sorted
    if (!sorted[p.category]) {
      sorted[p.category] = [p]
    } else {
      sorted[p.category].push(p)
    }
    return sorted
  }, {})
  const template = readTemplate('list-items')
  for (let category in sorted) {
    const vars = {
      category,
      projects: sorted[category]
    }
    const text = Mustache.render(template, vars)
    log(text)
  }
}
