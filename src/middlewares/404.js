function notFoundError(req, res, next) {
  const URL = `${req.headers.host}${req.url}`;

  const notFoundError = new Error();

  notFoundError.url = URL;
  notFoundError.status = 404;

  next(notFoundError);
}

function renderPage404(error, req, res, next) {
  if (error.status === 404) {
    return res.status(error.status).render('404', { url: error.url });
  }

  next();
}

module.exports = {
  notFoundError,
  renderPage404,
};
