const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // เชื่อมต่อกับ MongoDB โดยใช้ CONNECTION_STRING จากไฟล์ .env
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
        console.log("Database connected to", connect.connection.host);
        console.log("Database name:", connect.connection.name);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);  // หากเกิดข้อผิดพลาดจะหยุดการทำงานของแอปพลิเคชัน
    }
};

module.exports = connectDB;

