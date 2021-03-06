const config=require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    // Get Token from header
    const token = req.header('x-auth-token');
    
    //Token check
    if(!token){
        return res.status(401).json({msg:"No Token-No authorization plzz"})
    }
   
    // Token verification
    try {        
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } 
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};