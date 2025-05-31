const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const profileRouter = require('./routes/Profile');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", taskRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err.message);
    process.exit(1);
  });
