const async = require("hbs/lib/async");
const userDb = require("../models/userModel");

exports.post_user = async (req, res) => {
    try {
        const data = new userDb(req.body);
        const token = await data.genrateToken();
        console.log(token);
        const result = await data.save();
        return res.json({
            status: 1,
            statusCode: 200,
            msg: "Success",
            data: {
                "token" : token
            },
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

exports.get_all_user = async (req, res) => {
    try {
        const data = await userDb.find();
        return res.json({
            status: 1,
            statusCode: 200,
            msg: "Success",
            data: data,
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

exports.get_user_phone = async (req, res) => {
    try {
        const data = await userDb.find({phone: req.params.phone});
        return res.json({
            status: 1,
            statusCode: 200,
            msg: "Success",
            data: data,
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

