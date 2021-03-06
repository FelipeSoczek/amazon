const router = require('express').Router()
const Owner = require('../models/owner')
const storeImagePath = require('../middlewares/upload-photo-mongodb')

//POST api
router.post('/owners', storeImagePath('../admin/assets/owner-images').single('image'), async (req, res) => {
    try {
        let owner = new Owner()
        owner.name = req.body.name
        owner.about = req.body.about
        owner.photo = {
            contentType: 'image/png',
            filename: req.file.filename,
        }
        await owner.save()

        res.json({
            success: true,
            message: "Successfuly created a new owner"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

//GET api
router.get('/owners', async (req, res) => {
    try {
        let owners = await Owner.find()

        res.json({
            owners: owners
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router
