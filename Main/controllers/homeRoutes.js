const router = require('express').Router();
const { Product } = require('../models');
const { Customer } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/login', (req, res) => {
//   res.render('login', {
//     title: 'Login'
//   });
// });

// Login route
router.get('/login', (req, res) => {
  // If the customer is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('productsPage', { title: 'Products' });
});

router.get('/shoppingCart', async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const customerVar = customerData.map((project) => project.get({ plain: true }));

    res.render('shoppingCart', {
      title: 'Shopping Cart',
      Products,
      customerVar,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
