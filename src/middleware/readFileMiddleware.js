const { readFile, filepath } = require('../helpers/fileOperations');

async function readFileMiddleware(req, res, next) {
  try {
    const resource = await readFile(filepath);
    req.jsonData = resource;
    next();
  } catch (error) {
    res.sendError(error.message, 500);
  }
}

module.exports = readFileMiddleware;
