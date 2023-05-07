const Exchange = require('../models/exchangeModels');

// handler untuk membuat Exchange baru
const postExchange = async (req, res) => {
    const { amount, currencyfrom, currencyto, bank_countryfrom, bank_countryto, bank_namefrom, bank_nameto } = req.body;
    const user_id = req.user._id;
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const newExchange = new Exchange({
      user_id: user_id,
      orders_id: randomNumber.toString(),
      amount: amount,
      currencyfrom: currencyfrom,
      currencyto: currencyto,
      bank_countryfrom: bank_countryfrom,
      bank_countryto: bank_countryto,
      bank_namefrom: bank_namefrom,
      bank_nameto: bank_nameto
    });
    try {
      await newExchange.save();
      console.log('New exchange saved:', newExchange);
      res.status(200).json({ newExchange });
    } catch (error) {
      console.error('Error saving exchange:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
const getExchangeID = async (req,res) =>{
    const user_id = req.user._id;
    console.log(user_id)
    try {
      const orders = await Exchange.find({ user_id });
      if (!orders) {
        throw new Error('No Orders');
      }
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
const getExchange = async (req, res) => {
    try {
        const exchanges = await Exchange.find();
        res.json(exchanges);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
module.exports = {
    postExchange,
    getExchange,
    getExchangeID
}