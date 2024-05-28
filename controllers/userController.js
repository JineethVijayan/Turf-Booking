import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { userToken } from "../utils/generateToken.js";



export const signUp = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;
        console.log(email);

        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (userExist) {
            return res.send("user is already exist")
        }

        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            email,
            hashPassword
        });

        const newUserCreated = await newUser.save();

        if (!newUserCreated) {
            return res.send("new user is not created");
        }

        const token = userToken(email);

        res.cookie("token", token);
        res.send("signed up successfully")

    } catch (error) {
        console.log(error, "something wrong");
        res.status(500).send("Internal error");
    }

};

export const signin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send('Invalid email Id')
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword);

        if (!matchPassword) {
            return res.send("Invalid password");
        }

        const token = userToken(email);

        res.cookie("token", token);
        res.send("Login successfull");

    } catch (error) {
        console.log(error, "somwthing went wrong");
        res.status(500).send("Internal Error")
    }

}

