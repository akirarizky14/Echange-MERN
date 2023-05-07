const History = require('../models/historyModels');
const Exchange = require('../models/exchangeModels');

const createHistory = async (exchange) => {
  const { user_id, orders_id, amount, currencyfrom, currencyto, bank_countryfrom, bank_countryto, bank_namefrom, bank_nameto, status } = exchange;
  const newHistory = new History({
    user_id: user_id,
    orders_id: orders_id,
    amount: amount,
    currencyfrom: currencyfrom,
    currencyto: currencyto,
    bank_countryfrom: bank_countryfrom,
    bank_countryto: bank_countryto,
    bank_namefrom: bank_namefrom,
    bank_nameto: bank_nameto,
    status: status
  });
  try {
    await newHistory.save();
    console.log('New history saved:', newHistory);
  } catch (error) {
    console.error('Error saving history:', error);
    throw new Error('Internal Server Error');
  }
}

const deleteExchange = async (req, res) => {
  const { id } = req.params;
  try {
    const exchange = await Exchange.findOne({ orders_id: id });
    if (!exchange) {
      throw new Error('No Orders');
    }
    await createHistory(exchange);
    console.log(exchange)
    await Exchange.deleteOne({ orders_id: id });
    res.status(200).json({ message: 'Exchange deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


const getHistory = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        throw new Error('Only admin users can access this endpoint');
      }
      
      const history = await History.find({});
      res.status(200).json(history);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

const getHistoryId = async (req, res) => {
        const user_id = req.user._id
    try {
      const history = await History.find({user_id});
      res.status(200).json(history);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createHistory,
    deleteExchange,
    getHistory,
    getHistoryId
};
