const paramsToSlash = baseUrl => {
  const url = new URL(baseUrl)
  const search = new URLSearchParams(baseUrl)
  let newUrl = url.protocol.concat(
    '//',
    url.hostname,
    url.port || '',
    url.pathname
  )
  for (const param of search) {
    newUrl += '/'.concat(param[1])
  }
  return newUrl;
}

export default paramsToSlash