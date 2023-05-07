const profileModels = require('../models/profileModels');
const userModels = require('../models/userModels');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

// get all user
const getUsers = async (req, res) => {
  try {
    // Cek peran pengguna yang melakukan permintaan
    if (req.user.role !== 'admin') {
      throw new Error('Only admin users can access this endpoint');
    }

    // Lakukan pengambilan data pengguna
    const users = await userModels.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModels.login(email, password);
        if (user.role !== "user") {
          return res.status(403).json({ error: "Unauthorized Access" });
        }
        // token jwt
        const token = createToken(user._id)
        
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// login admin
const loginAdmin = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModels.login(email, password);
        if (user.role !== "admin") {
          return res.status(403).json({ error: "Unauthorized Access" });
        }
        // token jwt
        const token = createToken(user._id)
        
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// register user

const signupUser = async (req, res) => {
    const {email, password,first_name,last_name,phone_number,country,docs_number,docs_type,role} = req.body;
    try {
        const user = await userModels.signup(email, password,first_name,last_name,phone_number,country,docs_number,docs_type,role);
        // token jwt
        const token = createToken(user._id)
        const newProfile = new profileModels({
          user_id: user._id,
          email,
          first_name,
          last_name,
          phone_number,
          country,
          docs_number,
          docs_type,
          role
        });
        await newProfile.save();
        res.status(200).json({email,token, profile: newProfile, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// change password
const changePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;
  
    try {
    const user = await userModels.changePassword(email, password, newPassword);
      // Update password pada instance User
      user.password = newPassword;

      // Simpan perubahan ke dalam database
      const token = createToken(user._id)
  
      res.status(200).json({email,token});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
// delete users
const deleteuser = async (req, res) => {
    const { email } = req.body;

    try {
      await userModels.deleteOne({ email});
      res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    loginUser,
    signupUser,
    getUsers,
    changePassword,
    deleteuser,
    loginAdmin
}