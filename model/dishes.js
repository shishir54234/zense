const mongoose=require('mongoose')

const InputSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'must provide name'],
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    image: {
        type: String,
        required: [true, 'must provide name'],
        // maxlength: [20, 'name can not be more than 20 characters'],
    },
    price: {
        type: Number,
        required: [true, 'must provide name'],
        // maxlength: [20, 'name can not be more than 20 characters'],
    },
    size: {
        type: String,
        required: [true, 'must provide name'],
        // maxlength: [20, 'name can not be more than 20 characters'],
    }
    
  })
  
  module.exports = mongoose.model('dishes', InputSchema)