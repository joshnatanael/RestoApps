const Controller = require('../controllers/Controller');
const { authentication } = require('../middlewares/authentication');
const { authorization, updateStatusAuthorization } = require('../middlewares/authorization');
const router = require('express').Router();

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/login/google', Controller.googleSignIn);
router.use(authentication);
router.post('/food', Controller.addFood);
router.get('/food', Controller.getFood);
router.get('/food/:id', Controller.getFoodDetail);
router.delete('/food/:id', authorization, Controller.deleteFood);
router.get('/categories', Controller.getCategories);
router.post('/categories', Controller.addCategories);
router.get('/users', Controller.findUserDetail);
router.delete('/categories/:id', Controller.deleteCategory);
router.put('/food/:id', authorization, Controller.editFood);
router.patch('/food/:id/:status', updateStatusAuthorization, Controller.editFoodStatus);
router.get('/histories', Controller.getHistory);
router.get('/categories/:id', Controller.getCategoryDetail);
router.put('/categories/:id', Controller.editCategory);


module.exports = router;