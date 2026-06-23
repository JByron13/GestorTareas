const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTRO
router.post("/register", async (req,res)=>{

  try {

    const { username, password } = req.body;


    const existe = await User.findOne({
      username
    });


    if(existe){
      return res.status(400).json({
        message:"Usuario ya existe"
      });
    }


    const passwordHash = await bcrypt.hash(
      password,
      10
    );


    const user = new User({
      username,
      password: passwordHash
    });


    await user.save();


    res.json({
      message:"Usuario creado"
    });


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }

});



// LOGIN

router.post("/login", async(req,res)=>{

try{

const {username,password}=req.body;


const user = await User.findOne({
 username
});


if(!user){

return res.status(400).json({
 message:"Usuario no encontrado"
});

}



const valido = await bcrypt.compare(
 password,
 user.password
);



if(!valido){

return res.status(400).json({
 message:"Contraseña incorrecta"
});

}



const token = jwt.sign(
 {
  id:user._id
 },
 "clave_secreta",
 {
  expiresIn:"1d"
 }
);



res.json({
 token,
 username:user.username
});



}catch(error){

res.status(500).json({
 error:error.message
});

}


});


module.exports = router;