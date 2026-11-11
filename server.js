const express = require('express');
require('./config/mongoDbConnection');
const authMiddlewear = require('./middlewares/authMiddlewear');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth" , authRoutes);
app.use("/users", authMiddlewear , userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log(`Server Started at PORT : ${PORT}`);
})