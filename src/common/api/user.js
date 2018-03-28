import {GET} from '../http/method'

export const get = ({config, http}) => (id) =>
  http(GET(`${config.services.user}/user/${id}`)).chain((r) => r.json())

export const getAll = ({config, http}) => () =>
  http(GET(`${config.services.user}/user`)).chain((r) => r.json())
