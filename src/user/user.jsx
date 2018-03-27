import * as React from 'react'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table'
import map from 'ramda/src/map'
import compose from 'ramda/src/compose'
import toPairs from 'ramda/src/toPairs'
import {connect} from 'react-redux'
import * as actions from './action'

export class User extends React.PureComponent {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object,
    loadUser: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null
  }

  componentDidMount() {
    this.props.loadUser(this.props.userId)
  }

  render() {
    return (
      <div>
        {body(this.props.user)}
      </div>
    )
  }

}

const body = (user) => user ?
  <Table>
    <TableBody displayRowCheckbox={false}>
      {renderProp(user)}
    </TableBody>
  </Table> : null

const renderPropRow = map(([key, value]) =>
  <TableRow key={key}>
    <TableCell>
      {propertyMapping[key]}
    </TableCell>
    <TableCell>
      {value}
    </TableCell>
  </TableRow>
)

const renderProp = compose(renderPropRow, toPairs)

const propertyMapping = {
  firstName: 'First Name',
  lastName : 'Last Name',
  dateOfBirth: 'Date of Birth'
}

export default connect((state) => ({
  user: state.user
}), actions)(User)
