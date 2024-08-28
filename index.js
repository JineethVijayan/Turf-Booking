import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import userRouter from "./Routes/userRoute.js";
import managerRouter from "./Routes/managerRoutes.js";
import cookieParser from "cookie-parser";
import turfRouter from "./Routes/turfRoutes.js";
import cartRouter from "./Routes/cartRoutes.js";
import paymentRouter from "./Routes/paymentRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";


const app = express();

let whitelist = ['https://turf-booking-fe.vercel.app'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); 

//app.use(cors({origin:whitelist,credentials:true}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


app.use("/api/v1/user",userRouter);
app.use("/api/v1/managers",managerRouter);
app.use("/api/v1/turfs",turfRouter);
app.use("/api/v1/carts",cartRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/booking",bookingRouter);

const port = 3001;
connectDB();

app.get("/",(req,res)=>{
    res.send("Hello world!")
})

app.listen(port,()=>{
console.log(`App listening on port : ${port}`);
})