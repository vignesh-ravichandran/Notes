const { Users } = require('../models/index');



exports.findByEmail=async (email)=>{

   return await Users.findOne({
        where: {
            email: email
        }
    })

}

exports.saveNewUser=async (name, email, password) =>{

   return await Users.create({name: name, email:email, hashPassword:password});

}
