import express from "express";
import { createBookings } from "../controllers/bookingController.js";


const bookingRouter = express.Router();



bookingRouter.post("/create-booking",createBookings)




export default bookingRouter;