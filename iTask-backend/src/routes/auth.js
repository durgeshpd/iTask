const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {

    try {

        validateSignUpData(req);

        const { firstName, lastName, password, emailId, } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJWT();
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            
            res.send(user);
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull");

});

const { userAuth } = require("../middlewares/auth");

authRouter.get("/me", userAuth, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong." });
    }
});


module.exports = authRouter;