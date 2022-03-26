require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn.js");
const mGetMsg = require("./controller/getMsg");
const mStudent = require("./controller/studentDb");
const mUser = require("./controller/userController");
const mLogin = require("./controller/login");
const headerAuth = require("./controller/headerAuth");

const app = express();
const port = process.env.PORT || 3000;

console.log(`${process.env.SECRET_KEY}`);

// const staticPath = path.join(__dirname, "../public");
const template = path.join(__dirname, "/views");
const common = path.join(__dirname, "/common");



app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

//request from url 
app.use(express.urlencoded({ extended: false }));

//request from json (postman)
app.use(express.json())

// app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", template);
hbs.registerPartials(common);


app.get("/", (req, res) => {
    // res.render("index");
    res.send("database");

})

//contactUs
app.post("/contactus", headerAuth, mGetMsg.post_msg)
app.get("/contactus/find", headerAuth, mGetMsg.get_all_msg)
app.get("/contactus/find/:email", headerAuth, mGetMsg.get_msg_email)

//L2 registration student 
app.post("/student/add", headerAuth, mStudent.post_student)
app.get("/student/find", headerAuth, mStudent.get_all_student)
app.get("/student/find/:userId", headerAuth, mStudent.get_all_userId)

//L1 registration User
app.post("/user/signup", mUser.post_user)
app.get("/user/find", headerAuth, mUser.get_all_user)
app.get("/user/find/:phone", headerAuth, mUser.get_user_phone)

//login
app.post("/login", mLogin.login_data);




app.listen(port, () => {
    console.log(`Server start ${port}`);
})