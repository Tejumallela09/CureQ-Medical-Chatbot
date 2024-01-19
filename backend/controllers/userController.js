const User = require("../models/UserModel");
const {hashPassword} =require("../utils/hashPassword")
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, 'firstname lastname email gender phoneNumber');
        return res.json(users);
    } catch (err) {
        next(err);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { firstname, lastname, password, email, gender, phoneNumber } = req.body;
        if (!(firstname && lastname && email && gender && phoneNumber)) {
            return res.status(400).send("All inputs are required");
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("User exists");
        } else {
            const hashedPassword = hashPassword(password)
            const user = await User.create({
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                email: email.toLowerCase(),
                gender: gender,
                phoneNumber: phoneNumber,
            });
            res.status(201).json({
                success: "User Created",
                userCreated:{_id:user._id,firstname:user.firstname,
                lastname:user.lastname,gender:user.gender,
            email:user.email,phoneNumber:user.phoneNumber,}
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getUsers, registerUser };
