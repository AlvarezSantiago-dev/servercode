function pathHandler(req, resp, next) {
    return resp.json({
        statusCode: 404,
        message: `${req.method} ${req.url} not found path`
    })
};

export default pathHandler;