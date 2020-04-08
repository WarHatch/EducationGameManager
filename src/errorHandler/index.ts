export default (error: any, callback: (humanReadableError: string) => void) => {
  if (error.message) {
    console.error(error)
    callback(error.message)
  }
  // TODO: payload message extraction should probably be handled in dataHandler
  else if (error.response && error.response.data) {
    console.error({ ...error })
    callback(error.response.data) // Assumes data is text
  }
  else if (typeof error === "string") {
    console.error(error)
    callback(error);
  }
  else {
    console.warn("Forced to stringify received error in errorHandler")
    console.error(error)
    callback(String(error))
  }
}