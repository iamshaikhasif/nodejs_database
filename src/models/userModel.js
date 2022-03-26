const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    address:String,
    city:String,
    pinCode:Number,
    userCategory:String,
    password:String,
    token: String
})

userSchema.methods.genrateToken = async function(){
    try{
        const payload = {
            user: {
              id: this._id.toString(),
            },
          };
        const token = await jwt.sign({id: this._id.toString()}, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
        // const id = await jwt.verify(token,"com.asif.champianExample.token");
        // console.log(id);
    }catch(err){
        console.log(err);
    }
}

userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();

})


const userCollection = mongoose.model("User", userSchema);

module.exports = userCollection;