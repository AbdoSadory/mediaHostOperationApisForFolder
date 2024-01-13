const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    res
      .status(err['cause'] || 500)
      .json({ message: err.message, stack: err.stack })
  }
}

export default globalErrorHandler
