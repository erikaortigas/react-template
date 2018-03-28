import {api} from './api/api'
import {config} from './config'
import {createClient} from './http/http'

const http = createClient(window.fetch)

export const dependencies = () => ({
  api: api({config, http})
})
