const mongoose=require('mongoose')
const{Schema} = mongoose

const BdSchema = new Schema({
    name: String
})

const ElementModel = mongoose.model('db_elemento', BdSchema)

module.exports = ElementModel