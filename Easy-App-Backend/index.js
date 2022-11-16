const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

// const io =require("socket.io").listen(server)

connectDB();

const auth =require('./Routes/auth')
const socialAuth = require('./Routes/socialAuth')
const settings = require('./Routes/setting')
const task = require('./Routes/task')
const payment = require('./Routes/payment')
const feedBack = require('./Routes/feedback')
const ChatLogger = require("./Routes/StartChat");
const LocationLogger = require('./Routes/Location');
const Admin = require("./Routes/admin")

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

const port = process.env.PORT || 8080; //port

dotenv.config({ path: "./config/config.env" }); //env variable

app.use("/auth",auth)
app.use("/auth",socialAuth)
app.use("/settings",settings)
app.use("/task", task)
app.use("/payment",payment)
app.use("/feedback",feedBack)
app.use("/Chats",ChatLogger)
app.use("/Locations",LocationLogger)
app.use("/admin",Admin)

app.use(errorHandler); //error middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

io.on('connection', (socket)=>{
  console.log(socket.id);
})

server.listen(port, () => {
    console.log(
      `App running in ${process.env.NODE_ENV} listening on port ${port}`
    );
  });
  
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});

