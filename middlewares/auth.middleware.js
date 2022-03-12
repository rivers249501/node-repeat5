// escribir una funcion que valide las sesiones 
//util
const { jwt } = require('jsonwebtoken');
const dotenv = require('dotenv')
const { promisify } = require('util')

const {AppError  } = require('../util/appError')
const { catchAsync } = require('../util/catchAsyn');

dotenv.config({ path: './config.env' })

exports.validateSession = catchAsync(async(req, res, next) => {
//extraer el token del header
console.log('robert');
let token;

if(req.headers.authorization  && 
    req.headers.authorization.startsWith('Bearer'))
{
    //Bearer token123
    token = req.headers.authorization.split(' ')[1]
}
if(!token){
    return next(new AppError(400, 'invalid session'))
}
//verificar si el token fue validado
console.log(token);
// const validToken = await promisify(jwt.verify)(
//     token,
//     process.env.JWT_SECRET 
//     );
// if(!validToken){
//     return next(new AppError(401, 'invalid session'))
// }
//validar si el id existe y si el usuario sigue siendo valido
    next()
})