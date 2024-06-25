import Turf from "../models/turfModel.js";
import Manager from "../models/managerModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

export const getAllTurfs = async (req, res) => {
    const turfs = await Turf.find();
    res.send(turfs).status(200);
}

export const createTurf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "no file uploaded"
            })
        }

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err, "error");
                return res.status(500).json({
                    success: false,
                    message: "error"
                });
            }

            const imageUrl = result.url;

            const body = req.body;

            const { title, description, price, managerEmail } = body;
            console.log(managerEmail);

            const findManager = await Manager.findOne({
                email: managerEmail,
            });
            console.log(findManager);

            if (!findManager) {
                return res.send("please add manager first").status(201);
            }


            const createTurf = new Turf({
                title,
                description,
                price,
                manager: findManager._id,
                image: imageUrl,
            });


            const newTurfCreated = await createTurf.save();

            if (!newTurfCreated) {
                return res.send("turf is not created");
            }
            return res.send(newTurfCreated);

        });
    } catch (error) {
        console.log("something went wrong", error);
        res.send("failed to create course").status(201);
    }
}



export const updateTurf = async (req, res) => {

    const id = req.params.id;
    console.log(id);

    const { description, price, manager } = req.body;



    const updatedTurf = await Turf.findOneAndUpdate(
        { _id: id },
        { description, price, manager },
        {
            new: true,
        }
    );

    if (!updatedTurf) {
        return res.send("Turf is not updated");
    }

    console.log(updatedTurf);
    return res.send(updatedTurf);
};

export const deleteTurf = async (req, res) => {
    const id = req.params.id;
  
    const deleteId = await Turf.deleteOne({ _id: id });
  
    if (!deleteId) {
      return res.send("not deleted");
    }
    return res.send("turf deleted");
  };