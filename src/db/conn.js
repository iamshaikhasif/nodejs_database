const mongoose = require("mongoose");

mongoose.connect(process.env.DATA_BASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Connection success");
}).catch( (err) => {
    console.log(`Connection Error: ${err}`);
})