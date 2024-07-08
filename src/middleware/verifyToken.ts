// const jwt =  require('jsonwebtoken');


// const verifyToken = (req, res, next)=>{
//     const authHeader = req.headers.token
//     console.log("headeers", req.headers.token);

//     if(authHeader){
//         const token = authHeader.split(" ")[1];
//          console.log("token", token);
         
//         jwt.verify(token,process.env.JWT_SECRET, async (err,user)=>{
//          if(err) res.status(403).json('invalid token') 
//          req.user =user
//         next() 
//         });
//     }
//     else{
//         return res.status(401).json("user is not autheniticated")
//     }

// }


// module.exports = {verifyToken};


const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Use 'authorization' instead of 'token'
    console.log("headers", req.headers['authorization']);

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log("token", token);
        
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json('Invalid token');
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("User is not authenticated");
    }
}

module.exports = { verifyToken };
