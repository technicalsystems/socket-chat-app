export default function onError(err, req, res, next) {
  console.log(err)

  if ( res ) {
    const status = err.status || err.statusCode || 500
    const message = err.message || 'Произошла ошибка на сервере'
    res.status(status).json({ message })
  }
}