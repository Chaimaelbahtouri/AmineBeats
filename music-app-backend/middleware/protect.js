const jwt = require('jsonwebtoken');

const protect = (req,res,next)=> {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            error:"Not authorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET )
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            error: "token invalid"
        })
    }
    
}
const isAdmin = (req,res,next)=>{
    if (!req.user.isAdmin) {
        return res.status(403).json({
            message:"Access denied! Admin only!"
        })
    }
    next()
}
module.exports = {protect, isAdmin }