const Exchange = require('../models/exchangeModels');

const updateExchangee = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
      const exchange = await Exchange.findOne({ orders_id: orderId });
      if (!exchange) {
        return res.status(404).json({ message: 'Exchange tidak ditemukan' });
      }
      exchange.status = status;
      await exchange.save();
      res.json({ message: 'Status Exchange berhasil diperbarui' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    updateExchangee
};
