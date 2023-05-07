
const ProfileModel = require('../models/profileModels');

const getProfile = async (req, res) => {
  const user_id = req.user._id;
  try {
    const profile = await ProfileModel.findOne({ user_id });
    if (!profile) {
      throw new Error('Profile not found');
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile };
