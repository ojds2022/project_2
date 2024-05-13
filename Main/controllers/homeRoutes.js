const router = require('express').Router();
const { Product } = require('../models');
const { Customer } = require('../models');

router.get('/',  async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const Customers = customerData.map((project) => project.get({ plain: true }));

    res.render('product', {
      Products,
      Customers
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id',  async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));

    res.render('product-details', {
      Products
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
