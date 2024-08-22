import express from "express";
import { addCart, deleteCart, getCartByUserId } from "../controllers/cartController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const cartRouter = express.Router();




cartRouter.post("/addCart",authenticateUser,addCart)
cartRouter.get("/get-cartby-userId/:user",authenticateUser,getCartByUserId);
cartRouter.put("/delete-cart",authenticateUser,deleteCart);


export default cartRouter;