import express from "express";
//~ES5~ const express = require("express");
const route = express.Router();

import DocControllers from "../Controllers/docControllers.js";
//import auth from "../middleware/auth.js"


route.post("/post/:token", DocControllers.postDoc);

route.get("/get/:token", DocControllers.getDoc);

route.get("/todays/:date", DocControllers.getTodaysDoc);

//~ES5~ module.exports = route
export default route;