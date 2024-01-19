const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstname:
    {
        type: String,
        required:true,
    },
    lastname:
    {
        type: String,
        required:true,
    },
    password:
    {
        type: String,
        required:true,
    },
    email:
    {
        type: String,
        required:true,
        unique: true,
    },
    gender:
    {
        type: String,
        required:true,
    },
    phoneNumber:
    {
        type: String,
        required:true,
    },
    history:
    {
        type: String,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },

},{
    timestamps:true,
});
userSchema.index({ email: 1 });
const User=mongoose.model("User",userSchema);
module.exports=User;