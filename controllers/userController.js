import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { userToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
            hashPassword,
            role: 'user'
        });

        const newUserCreated = await newUser.save();

        if (!newUserCreated) {
            return res.send("new user is not created");
        }

        const token = userToken(email);

        const isProduction = process.env.NODE_ENV === "production";
        console.log(isProduction,'====idProduction');
        
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });

   
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
            return res.status(401).send('Invalid email Id')
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword);

        if (!matchPassword) {
            return res.status(401).send("Invalid password");
        }

        const role = user.role;

        const token = userToken(email);

        const isProduction = process.env.NODE_ENV === "production";
        console.log(isProduction,'====idProduction');
        
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });

        // res.send("Login successfull");
        res.json({ message: "loged in", role, token });
    } catch (error) {
        console.log(error, "somwthing went wrong");
        res.status(500).send("Internal Error")
    }

}


export const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.send(users);
}



export const findCurrentUser = async (req, res) => {

    const token = req.cookies.token;

    console.log(token);
    try {

        const decoded = jwt.verify(token, process.env.secretKey);
        console.log(decoded);
        const user = await User.findOne({ email: decoded.data }).select("-hashPassword")
        //console.log(user);
        if (!user) {
            return res.send("no user found");
        } else {
            return res.send(user);
        }
    } catch (error) {
        console.log(error);
    }
}


export const logout = async (req, res) => {
    try {
     
        res.clearCookie("token");
        
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Error");
    }
};


export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const deleteId = await User.deleteOne({ _id: id });

    if (!deleteId) {
        return res.send("not deleted");
    }
    return res.send("User deleted");
};

