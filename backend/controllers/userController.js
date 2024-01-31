const User = require("../models/UserModel");

const {hashPassword,comparePasswords} =require("../utils/hashPassword")
const generateAuthToken=require("../utils/generateAuthToken")
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
            res.cookie("access_token",generateAuthToken(user._id,user.firstname,user.lastname,user.email,user.isAdmin),{
                httpOnly:true,
                secure:process.env.NODE_ENV==="produuction",
                sameSite:"strict"
            })
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
// const loginUser = async (req, res, next) => {
//   try {
//     const { email, password, doNotLogout } = req.body;

//     if (!(email && password)) {
//       return res.status(400).send("All inputs are required");
//     }

//     const user = await User.findOne({ email }).orFail();

//     if (user && comparePasswords(password, user.password)) {
//       const authToken = generateAuthToken(
//         user._id,
//         user.firstname,
//         user.lastname,
//         user.email,
//         user.isAdmin
//       );

//       let cookieParams = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       };

//       if (doNotLogout) {
//         cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
//       }

//       res.cookie("access_token", authToken, cookieParams);

//       console.log("Generated Token:", authToken); // Add this line for debugging

//       return res.json({
//         success: "user logged in",
//         userLoggedIn: {
//           _id: user._id,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           phoneNumber: user.phoneNumber,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           doNotLogout,
//         },
//       });
//     } else {
//       return res.status(401).send("Wrong credentials");
//     }
//   } catch (err) {
//     next(err);
//   }
// };
const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Use try-catch to catch DocumentNotFoundError
    try {
      const user = await User.findOne({ email }).orFail();
      
      // Continue with your existing logic for comparing passwords and generating tokens
      if (user && comparePasswords(password, user.password)) {
        const authToken = generateAuthToken(
          user._id,
          user.firstname,
          user.lastname,
          user.email,
          user.isAdmin
        );

        let cookieParams = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };

        if (doNotLogout) {
          cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
        }

        res.cookie("access_token", authToken, cookieParams);

        console.log("Generated Token:", authToken); // Add this line for debugging

        return res.json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
      } else {
        return res.status(401).send("Wrong credentials");
      }
    } catch (error) {
      // Catch DocumentNotFoundError and handle appropriately
      if (error.name === 'DocumentNotFoundError') {
        return res.status(401).send("User not found");
      }

      // If it's a different error, pass it to the next middleware
      throw error;
    }
  } catch (err) {
    next(err);
  }
};


module.exports = { getUsers, registerUser,loginUser };
