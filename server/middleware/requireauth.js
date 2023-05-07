const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const requireauth = async (req,res,next) => {
  const {authorization} = req.headers

  if (!authorization){
    return res.status(401).json({error: "Auth Required"})
  }
  const token = authorization.split(' ')[1]

  try {
    const {_id} = jwt.verify(token,process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: "Req is not authorized"})
  } 
  
}

module.exports = requireauth