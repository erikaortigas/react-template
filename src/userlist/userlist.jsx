import * as React from 'react'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table'
import map from 'ramda/src/map'
import {connect} from 'react-redux'
import * as actions from './action'

export class UserList extends React.PureComponent {

  static propTypes = {
    users: PropTypes.array.isRequired,
    loadUsers: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    return (
      <div>
        <Table>
          {header()}
          {body(this.context.router.history)(this.props.users)}
        </Table>
      </div>
    )
  }

}

const header = () =>
  <TableHead displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
      <TableCell>
        ID
      </TableCell>
      <TableCell>
        Name
      </TableCell>
    </TableRow>
  </TableHead>

// eslint-disable-next-line react/display-name
const body = (history) => (users) =>
  <TableBody displayRowCheckbox={false}>
    {renderUser(loadUser(history))(users)}
  </TableBody>

const renderUser = (loadUser) => map(({id, firstName}) =>
  <TableRow key={id} onClick={loadUser(id)}>
    <TableCell>
      {id}
    </TableCell>
    <TableCell>
      {firstName}
    </TableCell>
  </TableRow>
)

const loadUser = (history) => (id) => () => history.push(`/user/${id}`)

export default connect((state) => ({
  users: state.users
}), actions)(UserList)
