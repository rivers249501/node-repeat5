const globalErrorhandler = (err,req, res, next) => {
    // app.use((err, req, res, next) => {
        res.status(err.statusCode).json({
          // console.table(err);
          status: err.status,
          message: err.message,
          stack: err.stack
        });
      
}

module.exports = { globalErrorhandler }