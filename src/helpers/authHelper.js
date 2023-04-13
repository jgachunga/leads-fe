export const authHeader = async () => {
  const token = await localStorage.getItem('token')

  if (token != null) {
    return {
      Authorization: 'Bearer ' + token,
    }
  } else {
    return {}
  }
}
