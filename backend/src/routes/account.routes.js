const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create-account',authMiddleware.tokenVerification,accountController.createAccountController);
router.get('/getAllAccounts',authMiddleware.tokenVerification,accountController.getAllAccountsController);
router.get('/getAccountBalance/:accountId',authMiddleware.tokenVerification,accountController.getAccountBalanceController);

module.exports = router;