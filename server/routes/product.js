var fs = require('fs');
var path = require('path');
const router = require('express').Router()
const Product = require('../models/product')
const storeImagePath = require('../middlewares/upload-photo-mongodb')

// POST request = create a new product
router.post('/products', storeImagePath('upload-images/product-images').single('image'), async (req, res) => {
    try {
        let product = new Product()

        product.title =  req.body.title
        product.description = req.body.description
        product.photo = {
            data: fs.readFileSync(path.join(__dirname, '..' + '/upload-images/product-images/' + req.file.filename)),
            contentType: 'image/png'
        }

        await product.save()

        res.json({
            status: true,
            message: 'Successfully saved'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET request = get all products

// GET request = get a single product

// PUT request = Update a single product

// DELETE request = delete a single product

// GET - RETRIVING THE PRODUCTS IMAGES ON EJS TEMPLATE - /api/all-images
router.get('/all-images', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    });
});

module.exports = router
