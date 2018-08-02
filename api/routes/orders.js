const express = require('express');

const router = express.Router();

// Handle incoming get request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'This the get request! for \'orders'
    });
});


router.post('/', (req, res, next) => {
    const orders = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'This the post request!',
        orders: orders
    });
});

router.get('/:orderId', (req, res, next) => {
    
    const id = req.params.orderId;
    
    if (id === 'special') {
        res.status(200).json({
            message: 'you discovered an the special orderId',
            orderId: id
        });
    } else {
        res.status(200).json({
            message: 'you passed an ID',
            orderId:id
        });
    }
});

module.exports = router;