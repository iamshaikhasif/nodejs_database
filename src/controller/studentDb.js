const async = require("hbs/lib/async");
const studentdb = require("../models/students");

exports.post_student = async (req, res) => {
    try {
        console.log(`id= ${req.id}`);
        const data = new studentdb(req.body);
        const result = await data.save();
        return res.json({
            status: 1,
            statusCode: 200,
            msg: "Success",
            data: result,
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

exports.get_all_student = async (req, res) => {
    try {
        const data = await studentdb.find();
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

exports.get_all_userId = async (req, res) => {
    try {
        const data = await studentdb.find({ userId: req.params.userId });
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


