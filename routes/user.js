const express = require("express");
const router = express.Router();

const { createUser, updateUser, getAllUser, getUserById, deleteUser } = require("../controllers/Auth");

router.post("/users", createUser);
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;