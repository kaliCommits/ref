const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
// const socketIO = require("socket.io");

//file
const signup = require("./routes/auth/signup");
const signin = require("./routes/auth/signin");
const signout = require("./routes/auth/signout");
const currentUser = require("./routes/auth/current-user");
const createTransaction = require("./routes/transaction/createTransaction");
const getAllTransaction = require("./routes/transaction/getAllTransaction");
const updateTransaction = require("./routes/transaction/updateTransaction");
const deleteTransaction = require("./routes/transaction/deleteTransaction");
const profileMain = require("./routes/profile/main");
const errorHandler = require("./middleware/error-hadler");
const BadRequestError = require("./errors/BadRequestError");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // domain: "localhost:3000",
    // sameSite: "none",
    // httpOnly: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signup);
app.use(signin);
app.use(signout);
app.use(currentUser);
app.use(getAllTransaction);
app.use(createTransaction);
app.use(updateTransaction);
app.use(deleteTransaction);
app.use(profileMain);

app.use("*", () => {
  res.status(404).send("Page not Found");
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost/dailyShare", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("database connnected successfully");
  } catch (err) {
    throw new BadRequestError("database error");
    // next(new MongoConnErr("database error"));
  }
  app.listen(4000, () => {
    console.log("server started port 4000");
  });
};

start();

// const socketServer = app.listen(4000, () => {
//   console.log("server started port 4000");
// });
// const io = socketIO(socketServer);

// io.on("connect", (socket) => {
//   console.log("connected");
//   const users = { name: "ramesh" };
//   socket.emit("intialData", JSON.stringify(users));
//   socket.on("starter", (data) => {
//     console.log(data);
//   });
// });
