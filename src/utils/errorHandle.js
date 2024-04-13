export const errorHandle = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json ({
        statusCode: err.statusCode || 500,
        success : false,
        message : err.message || "internal server error",
    });
};