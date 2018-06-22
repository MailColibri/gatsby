import { Component } from "react"
import { withRouter } from "react-router-dom"
import qs from "qs"

class URLQuery extends Component {
  state = {}

  componentDidMount = () => {
    const {
      history,
      location: { search },
    } = this.props

    this.updateFilters(search)

    this.unlisten = history.listen(({ search }) => {
      this.updateFilters(search)
    })
  }

  componentWillUnmount = () => {
    this.unlisten()
  }

  updateFilters = search => {
    const { filters } = qs.parse(search.replace(`?`, ``))

    this.setState(() => {
      return {
        filters: filters || [],
      }
    })
  }

  updateQuery = fn => {
    const {
      history: { push },
      location: { pathname },
    } = this.props

    const newQuery = fn(this.state)
    const queryString = qs.stringify(newQuery)

    push(`${pathname}?${queryString}`)
  }

  render = () => this.props.children(this.state, this.updateQuery)
}

export default withRouter(URLQuery)
