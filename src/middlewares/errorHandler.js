function errorHandler (error, req, resp, next){
    return resp.json({
        statusCode: error.statusCode || 500,
        message: error.message || `Coder Api Error`
    })
};
export default errorHandler;