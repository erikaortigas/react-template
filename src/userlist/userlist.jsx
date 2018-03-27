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

export const UserList = ({users}) =>
  <div>
    <Table>
      {header()}
      {body(users)}
    </Table>
  </div>

UserList.propTypes = {
  users: PropTypes.array.isRequired
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
      <TableCell>
        Status
      </TableCell>
    </TableRow>
  </TableHead>

const body = (users) =>
  <TableBody displayRowCheckbox={false}>
    {renderUser(users)}
  </TableBody>

const renderUser = map(({id, name, status}) =>
  <TableRow>
    <TableCell>
      {id}
    </TableCell>
    <TableCell>
      {name}
    </TableCell>
    <TableCell>
      {status}
    </TableCell>
  </TableRow>
)

export default connect((state) => ({
  users: state.users
}))(UserList)
