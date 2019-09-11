import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const request = options => {
  const onSuccess = response => {
    const total = parseInt(response.headers['x-total-count'])

    return Promise.resolve({
      total,
      ...response.data
    })
  }

  return client(options).then(onSuccess)
}

export default request
