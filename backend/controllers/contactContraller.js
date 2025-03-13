const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact'); // เพิ่มการนำเข้าโมเดลที่นี่

// @desc Get all contacts
// @route GET /api/contacts
// @access public


const getContacts  = asyncHandler (async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});


// @desc Create new contacts
// @route POST /api/contacts
// @access public

const createContact = asyncHandler (async (req, res) => {
        const { name, email, phone, designation } = req.body;
        if (!name || !email || !phone || !designation) {
            res.status(400);
            throw new Error("All fields are required!");
        }
        // สร้าง contact ใหม่ในฐานข้อมูล
        const contact = await Contact.create({
            name,
            email,
            phone,
            designation
        });
        // ส่งข้อมูลกลับไปที่ Postman พร้อมข้อมูลที่บันทึก
        res.status(201).json(contact); // contact ที่บันทึกจะมี _id, createdAt, updatedAt และ __v โดยอัตโนมัติ
    });





// @desc get single contacts
// @route GET /api/contacts/:id
// @access public



const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json(contact);
});

// @desc Update new contacts
// @route POST /api/contacts/:id
// @access public


const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
});

// @desc Delete new contacts
// @route DELETE /api/contacts/:id
// @access public


const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json({message:`Contact delete for ${req.params.id}`});
});


module.exports = { getContacts, createContact ,getContact,updateContact,deleteContact }