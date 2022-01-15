export const makeApi = baseUrl => ({
  get: (resource, options) =>
    fetch(`${baseUrl}/${resource}`, options).then(response => response.json())
})

export const api = makeApi('https://jsonplaceholder.typicode.com')
