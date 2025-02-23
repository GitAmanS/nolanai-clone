require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
