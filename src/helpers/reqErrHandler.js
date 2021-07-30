const defaultMsg = 'Something went wrong'

export function reqErrHandler(error) {
  if (!error || !error.response || !error.response.data)
    return defaultMsg

  if (typeof error.response.data !== 'string') {
    return (
      error.response.data.error ||
      error.response.data.detail ||
      error.response.data.error_description ||
      error.response.data.message ||
      error.response.data.msg ||
      defaultMsg
    )
  } else {
    return error.response.data || defaultMsg
  }
}
