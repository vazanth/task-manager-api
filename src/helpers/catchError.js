module.exports = (fn) => (req, res, next) => {
  try {
    const result = fn(req, res, next);

    // If the function returned a promise, handle any promise rejections
    if (result && result.catch) {
      result.catch((err) => {
        res.sendError(err.message, err?.statusCode || 500);
      });
    }
  } catch (err) {
    res.sendError(err.message, 500); // Handle synchronous errors
  }
};
