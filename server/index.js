import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import router from "./router/product.router.js"
import cors from "cors"

dotenv.config()

const port = process.env.PORT || 2804
const db = process.env.DB_URL
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/products", router)

mongoose.connect(db)
.then((res) => console.log("Database is connected"))
.catch((error) => console.log(error.message))

app.listen(port, () => console.log("app is connected"))