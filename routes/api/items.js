const express = require('express');
const router = express.Router();
var sort = require('alphanum-sort');

//Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .then(items => res.json(items));
});

// @route POST api/item
// @desc Create An Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
   Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})

module.exports = router;
