export const READER = 'READER'

const status = (state) => (val) => `${val}_${state}`

export const success = status('SUCCESS')

export const error = status('ERROR')

export const request = status('REQUEST')
