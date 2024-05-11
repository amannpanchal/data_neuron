const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors')
const  { connectDatabase}  = require('./config/connectDB')
connectDatabase();
app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/main")
app.use('/api/v1',routes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
