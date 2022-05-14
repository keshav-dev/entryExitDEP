const express = require("express");
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");

const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const securityRoutes = require("./routes/securityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");



const app = express();
dotenv.config();
app.use(fileUpload());
connectDB();

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/security',securityRoutes);
app.use('/api/admin',adminRoutes);



app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`running on port: ${PORT}`));