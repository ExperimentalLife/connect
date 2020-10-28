import { method } from './constants'
import Proxy from './proxy'

import paramsToSlash from './converter'

class Connect {
  constructor(schema = {}, config = null) {
    this.schema = schema
    this.handle = new Proxy(config).handler
  }

  addService(name, funcObject) {
    if (!name || !funcObject) return;

    if (!this.schema[name])
      this.schema[name] = []
    this.schema[name].push(funcObject)
  }

  loadService(name) {
    const schema = this.schema[name]
    let service = {}
    for (const i in schema) {
      const fn = schema[i]
      service[fn.name] = (args = {}) => this.handler(fn.method, fn.url, args)
    }
    return service
  }
}

export {
  Connect,
  method,
  paramsToSlash
}

