const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
    name: String,
    about: String,
    photo:
    {
        data: Buffer,
        contentType: String,
        path: String,
        filename: String,
        destination: String,
        imagePath: String
    },
})

module.exports = mongoose.model("Owner", OwnerSchema)
