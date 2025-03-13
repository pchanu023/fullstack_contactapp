const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors"); // เพิ่มการใช้งาน cors
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./connection/dbConnection");

connectDB();
const app = express();

// ใช้ CORS เพื่ออนุญาตการเข้าถึงจากโดเมนที่ระบุ
app.use(cors({
    origin: 'http://localhost:5174', // เปลี่ยน URL นี้เป็น URL ของ frontend (Vue.js)
    methods: 'GET,POST,PUT,DELETE',  // กำหนด HTTP methods ที่อนุญาต
    allowedHeaders: 'Content-Type,Authorization', // กำหนด headers ที่อนุญาต
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
