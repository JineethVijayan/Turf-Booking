import express from "express";
import { createBookings, findBookingsByTurfIds } from "../controllers/bookingController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import authenticateManager from "../middlewares/managerMiddleware.js";


const bookingRouter = express.Router();



bookingRouter.post("/create-booking",authenticateUser,createBookings)

bookingRouter.post("/get-bookings",authenticateManager,findBookingsByTurfIds);


export default bookingRouter;