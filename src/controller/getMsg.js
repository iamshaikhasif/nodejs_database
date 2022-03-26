const async = require("hbs/lib/async");
const contactDb = require("../models/contactModel");

exports.get_all_msg = async (req, res) => {
    // res.render("index");
    try {
        const data = await contactDb.find();
        return res.json({
            status: 1,
            statusCode: 200,
            message: "Success",
            data: data,
        });
    } catch (err) {
        return res.json({
            status: 0,
            statusCode: 400,
            message: "Exception",
            error: err,
        });
    }

}

exports.get_msg_email = async (req, res) => {
    try {
        const data = await contactDb.find({ email: req.params.email });
        return data.length != 0 ? res.json({
            status: 1,
            statusCode: 200,
            message: "Success",
            data: data,
        }) : res.json({
            status: 0,
            statusCode: 404,
            message: "Fail",
            error: "Not Found",
        });
    } catch (err) {
        return res.json({
            status: 0,
            statusCode: 400,
            message: "Exception",
            error: err,
        });
    }
}


exports.post_msg = async (req, res) => {
    try {
        console.log(req.body);
        const data = new contactDb(req.body);
        try {
            const result = await data.save();
            return res.json({
                status: 1,
                statusCode: 200,
                msg: "Success",
                data: result,
            });
        } catch (error) {
            return res.json({
                status: 0,
                statusCode: 404,
                msg: "fail",
                error: error
            });
        }
    } catch (error) {
        return res.json({
            status: 0,
            statusCode: 400,
            msg: "Exception",
            error: error
        });
    }
}
