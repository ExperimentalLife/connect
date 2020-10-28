import { success, error } from './response'
import { instance } from './connect'
import { method } from './constants'

class Proxy {
  constructor(config = null) {
    if (config)
      this.connect = instance(config)
    else
      this.connect = instance()
  }

  httpConnect() {
    return Object.assign(
      {},
      [method.GET, method.POST, method.DELETE, method.PUT, method.PATCH].reduce(
        (object, method) =>
          Object.assign({}, object, {
            [method](url, payload) {
              if (method === 'post' || method === 'put') {
                return this.connect.request({
                  url,
                  method,
                  data: payload
                })
              } else {
                return this.connect.request({
                  url,
                  method,
                  params: payload
                })
              }
            }
          }),
        {}
      )
    )
  }

  async handler(method, url, payload) {
    try {
      const response = await httpConnect()[method](url, payload)
      return success(response)
    } catch (err) {
      return error(err)
    }
  }

}

export default Proxy