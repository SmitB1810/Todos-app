const jwt = require('jsonwebtoken');

const JWT_SECRET = "medkart";

const fetchuser = (req, res, next) => {
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with a valid token"});
    }
    try {
        // token = token.split(' ')[1];
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate with a valid token"});
    }
}

module.exports = fetchuser