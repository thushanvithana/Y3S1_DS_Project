const {roles}=require("../authenticate/models/roles")
const User = require("../authenticate/models/users")
const jwt = require('jsonwebtoken');

let decoded;
  let roleOne;
const requireAuth = async(req, res, next) => {
   
    console.log(req.headers['authorization']);
    
      let token = req.headers['authorization'];
  
      if(!token){
        return res.status(403).send("A token is required for authentication.");
  }

    try{
      decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
      console.log("user Id  "+decoded._id)
      //req.user = await User.findById(decoded._id);
      roleOne =  decoded.role;
      console.log(roleOne)
      console.log("next")

      
      next();
  
    }catch(err){
      console.error(err);
      return res.status(401).send(new Error('Invalid token'));
    }
  
    }

    const requireRoleSeller = async(req, res, next)=> {
      console.log(decoded.role)
    if (decoded.role === roles.seller) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  
  }
    const requireRoleAdmin = async(req, res, next)=> {
      if (decoded.role === roles.admin) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    
  }

  const requireRoleBuyer = async(req, res, next)=> {
    if (decoded.role === roles.buyer) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  
}




exports.requireAuth = requireAuth
exports.requireRoleSeller = requireRoleSeller;
exports.requireRoleAdmin = requireRoleAdmin;
exports.requireRoleBuyer = requireRoleBuyer;
