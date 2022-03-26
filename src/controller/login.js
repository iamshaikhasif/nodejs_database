const async = require("hbs/lib/async");
const userDb = require("../models/userModel");

exports.login_data = async (req, res) => {

    try {
        const data = await userDb.findOne({ phone: req.body.phone });
        const token = await data.genrateToken();
        console.log(token);
        return data != null ? res.json({
            status: 1,
            statusCode: 200,
            msg: "success",
            data: {
                "token": token
            },
        }) : res.json({
            status: 0,
            statusCode: 404,
            msg: "fail",
            error: "Not Found",
        });
    } catch (err) {
        return res.json({
            status: 0,
            statusCode: 400,
            msg: "Exception",
            error: error,
        });
    }
}
