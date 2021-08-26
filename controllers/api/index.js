// create an express router using IMPORT statements and es6 class syntax
import express from "express";
import userRoutes from "./userRoutes";
const router = express.Router();

router.use("/users", userRoutes);

module.exports = router;
