export const makeApi = baseUrl => ({
  get: (resource, options) =>
    fetch(`${baseUrl}/${resource}`, options).then(response => response.json())
})

export const api = makeApi('https://jsonplaceholder.typicode.com')

export const prop = key => object => object?.[key]
