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
            data: fs.readFileSync(
                path.join(__dirname, '..' + '/upload-images/product-images/' + req.file.filename)
            ),
            contentType: 'image/png',
            path: req.file.path,
            filename: req.file.filename,
            destination: req.file.destination
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
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find()

        res.json({
            success: true,
            products: products
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request = get a single product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id })

        res.json({
            success: true,
            product: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// PUT request = Update a single product
router.put('/products/:id', storeImagePath('upload-images/product-images').single('image'), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id }, 
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    photo: {
                        data: fs.readFileSync(
                            path.join(__dirname, '..' + '/upload-images/product-images/' + req.file.filename)
                        ),
                        contentType: 'image/png',
                        path: req.file.path,
                        filename: req.file.filename,
                        destination: req.file.destination
                    },
                    description: req.body.description,
                    owner: req.body.ownerID,
                    stockQuantity: req.body.stockQuantity
                },
            },
            { upsert: true }
        )

        res.json({
            success: true,
            updatedProduct: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// DELETE request = delete a single product
router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id })

        if(deletedProduct) {
            res.json({
                status: true,
                message: "Successfully deleted"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

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
