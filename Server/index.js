const express = require("express");
const authRoutes = require("./routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const profileRoutes = require("./routes/ProfileRoutes");
const { cloudinaryConnect } = require("./config/cloudinary");
const courseRoutes = require("./routes/CourseRoutes");
const courseProgressRoutes = require("./routes/CourseProgress");
const paymentRoutes = require("./routes/PayementRoutes");
const contactUsRoutes = require("./routes/ContactUs");
const cors = require("cors");
require("dotenv").config();
const summaryRoutes = require("./routes/Summary");
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
cloudinaryConnect();
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/courseProgress", courseProgressRoutes);
app.use("/api/v1/summary", summaryRoutes);
app.use("/api/v1/contactUs", contactUsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// db connect 
const dbconnect = require("./config/database");
dbconnect();