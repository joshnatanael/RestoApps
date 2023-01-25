const CustomerController = require('../controllers/CustomerController');
const { customerAuthentication } = require('../middlewares/customerAuthentication');
const router = require('express').Router();

router.post('/register', CustomerController.customerRegister);
router.post('/login', CustomerController.customerLogin);
router.post('/login/google', CustomerController.customerGoogleSignIn);
router.get('/food', CustomerController.getFilteredFood);
router.get('/food/:id', CustomerController.getFoodDetail);
router.get('/categories', CustomerController.getCategories);
router.use(customerAuthentication)
router.get('/favourites', CustomerController.getCustomerFavourite);
router.post('/favourites/:id', CustomerController.addCustomerFavourite);
router.delete('/favourites/:id', CustomerController.deleteCustomerFavourite);
router.get('/users', CustomerController.getCustomerDetail);

module.exports = router;