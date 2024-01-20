jwt=require("jsonwebtoken")

const generateAuthToken = (_id,firstname,lastname,email,isAdmin)=>{
    return jwt.sign({_id,firstname,lastname,email,isAdmin},
        process.env.JWT_SECRET_KEY,
        { expiresIn:"7h"})
}
module.exports=generateAuthToken;