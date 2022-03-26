const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const userDb = require("../models/userModel");

const headerAuth = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.json({
                status: 0,
                statusCode: 403,
                msg: "A token is required for authentication",
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(`${decoded._id}`);
        const user = await userDb.findOne({ _id: decoded._id });
        if (token != user.token) {
            return res.json({
                status: 0,
                statusCode: 401,
                msg: "Invalid Token",
            });
        }
        
        req.id = decoded._id;
        next();
    } catch (err) {
        return res.json({
            status: 0,
            statusCode: 401,
            msg: "Exception",
            error: err
        });
    }
    
}

module.exports = headerAuth;