import fetch from 'isomorphic-fetch'
import Cookies from 'universal-cookie'

const GATEWAY_API_URL =  "https://api.szjys.com"  //"http://staging-api.intranet.szjys.com";
const loginApi = "/uaa/oauth/token"

export const fetchBase = (method = 'GET', endPoint = '/hello', params = {}, customeHeaders = {}) => {
  let url = GATEWAY_API_URL + endPoint
  const cookies = new Cookies();
  const token = cookies.get('dae_token') ? `Bearer ${cookies.get('dae_token')}` : null

  const headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token
  }, customeHeaders)

  const options = { method, headers }

  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else if (method === 'POST' || method === 'PUT') {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']
      const formData = new FormData()
      Object.keys(params).forEach(key => formData.append(key, params[key]))
      options.body = formData
    } else {
      options.body = JSON.stringify(params)
    }
  }

  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => Promise.reject({ message: e.error }))
    }

    const contentType = res.headers.get('content-type')

    if (/json/.test(contentType)) {
      return res.json()
    }

    return null
  })
}


export const oauth = params => fetchBase('POST', '/uaa/oauth/token', params, { Authorization: 'Basic YnJvd3Nlcjo=', 'Content-Type': 'application/x-www-form-urlencoded' })
export const list = params => fetchBase('GET', '/trade/balance', params)