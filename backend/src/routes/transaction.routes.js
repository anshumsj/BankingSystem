const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

router.post('/transfer',authMiddleware.tokenVerification,transactionController.createTransactionController);
router.post('/system/initial-funds',authMiddleware.systemUserVerification,transactionController.initialFundsTransactionController);

module.exports = router;