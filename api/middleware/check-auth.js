const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY, null);
        req.userData = decode;
        next();
    }catch(err){
        return res.status(401).json({
            message:"auth failed"
        });
    }

}