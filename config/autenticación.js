const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const descifrar = jwt.verify(token, "secret");
        req.userData = descifrar;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Ha ocurrido un error con la autenticación"
        });
    }
}