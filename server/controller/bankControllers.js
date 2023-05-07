const bankModels = require('../models/bankModels');

const postbank = async (req,res) => {
  const {bank_country,bank_name,bank_number,expired_card,cvc_number} =  req.body;
  try {
        const user_id = req.user._id
        console.log(user_id)
      const user = await bankModels.create({bank_country,bank_name,bank_number,expired_card,cvc_number,user_id})
      console.log(user)
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}
const getbank = async (req, res) => {
    const user_id = req.user._id
      const users = await bankModels.find({user_id});
      res.status(200).json(users)

}
const getBankDetails = async (req, res) => {
  try {
    // Retrieve all bank details from the database
    const bankDetails = await bankModels.find();

    res.status(200).json(bankDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
    postbank,
    getbank,
    getBankDetails
}