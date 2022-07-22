var jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SCRET;

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({
            error: "Please authentication using a valid token"
        });
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        // use to call the next function in the import file after this.
        next();
    } catch (error) {
        res.status(401).send({
            error: "Please authentication using a valid token"
        });
    }


}
module.exports = fetchuser;