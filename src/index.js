import express from "express";
import connectDB from "../config/database.js";
import userRouter from "../Routes/userRoute.js";
import managerRouter from "../Routes/managerRoutes.js";
import cookieParser from "cookie-parser";
import turfRouter from "../Routes/turfRoutes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user",userRouter);
app.use("/api/v1/managers",managerRouter);
app.use("/api/v1/turfs",turfRouter);

const port = 3001;
connectDB();

app.listen(port,()=>{
console.log(`App listening on port : ${port}`);
})