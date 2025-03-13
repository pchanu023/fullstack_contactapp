const express = require("express");
const routes = express.Router();
const { getContacts,createContact,getContact,updateContact,deleteContact } = require("../controllers/contactContraller")


routes.route("/").get(getContacts);

routes.route("/").post(createContact);

routes.route("/:id").get(getContact);

routes.route("/:id").put(updateContact);

routes.route("/:id").delete(deleteContact);



module.exports = routes;