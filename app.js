const express = require('express');

const { globalErrorhandler } = require('./controllers/error.controller');

// Routers
const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { commentsRouter } = require('./routes/comment.routes');
//util
const { AppError } = require('./util/appError');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);

//se debe colocar en orden  y la funcion de abajo,
// te retorna un error al ingresar una url invalidad 
//(el asteristo es cualquier ruta, atrapa rutas que no esta definidas en el servidor)
app.use('*', (req, res, next) => {
 next(new AppError(404, `${req.originalUrl} not found in this serves`));
} )
//error handler error es una instancia de appError
app.use(globalErrorhandler);

module.exports = { app };


