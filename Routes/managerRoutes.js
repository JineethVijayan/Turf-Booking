import express from "express";
import Manager from "../models/managerModel.js";
import { signup, signin, getAllManagers, removeManager } from "../controllers/managerController.js";
import authenticateManager from "../middlewares/managerMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";


const managerRouter = express.Router();

managerRouter.get("/check-instructor", authenticateManager, async (req, res) => {

    const manager = req.manager;

    console.log(manager.data);

    const findManager = await Manager.findById({ _id: manager.data });

    if (!findManager) {
        return res.json({ message: "authentication failed", success: false });
    }
    res.json({ message: "authenticate Manager", success: true });
}
);


managerRouter.post("/signup", signup);
managerRouter.post("/signin", signin);
managerRouter.get("/get-managers", getAllManagers);
managerRouter.delete("/remove-managers/:id", removeManager)


export default managerRouter;