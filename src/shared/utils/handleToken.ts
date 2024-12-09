const getTokenFromCookie = () => {
  const name = 'access_token'
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  if (match) return match[2]

  return null
}

const setTokenFromCookie = (value: string, days?: number) => {
  const name = 'access_token'
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

const deleteTokenFromCookie = () => {
  const name = 'access_token'
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export { getTokenFromCookie, setTokenFromCookie, deleteTokenFromCookie }
