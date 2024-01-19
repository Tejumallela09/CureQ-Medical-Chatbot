const bcrypt = require("bcryptjs")
const users = [
    {
        firstname: 'admin',
        lastname: 'admin',
        password: bcrypt.hashSync('0000000000',10),
        email:'admin@admin.com',
        gender: 'female',
        phoneNumber:'0000000000',
        isAdmin: true,

    },
    {
        firstname: 'Tejaswi',
        lastname: 'Mallela',
        password: bcrypt.hashSync('password',10),
        email:'tejaswimallela09@gmail.com',
        gender: 'female',
        phoneNumber:'9493492550',
        // isAdmin: false,
    }
]
module.exports=users