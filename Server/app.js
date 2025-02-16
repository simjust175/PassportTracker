import express from "express"
const app= express();

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";

import docRoutes from "./Routers/docRoutes.js";
import RegisterRoutes from "./Login_system/Router/registerRoutes.js"

const port = process.env.PORT || 1221;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/doc", docRoutes)
app.use("/register", RegisterRoutes)


app.listen(port, ()=>{
    console.log("Passport is running on port -", port);
})