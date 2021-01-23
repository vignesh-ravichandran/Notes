const jwt= require('jsonwebtoken');



module.exports=function(req,res,next){

    const token=req.header('x-auth-token');

    //check if no token
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied"});
    }

    try {
        const decoded=jwt.verify(token,process.env.JWTSECRET);
        req.userId=decoded.user.id;
        next();


    } catch (error) {
        res.status(401).json({msg:'Token is not valid'});
    }

}