const jwt = require("jsonwebtoken");


module.exports = function(req,res,next){

const token = req.headers.authorization;


if(!token){
 return res.status(401).json({
  message:"No autorizado"
 });
}


try{

const decoded = jwt.verify(
 token,
 "clave_secreta"
);


req.user = decoded.id;


next();


}catch(error){

res.status(401).json({
 message:"Token inválido"
});

}

};