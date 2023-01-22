const express  = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const static = require("static");
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
const connectDatabase = require("./config/db.js");
const errorMiddleware = require("./middleware/error");   
dotenv.config({path:"config/config.env"})
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

connectDatabase();

const user = require("./routers/userRoute.js");
app.use("/api/v1",user);





app.use(errorMiddleware);

const port  = 4000;
app.listen(port,()=>{
     console.log(`App is running at server ${port}`);
})