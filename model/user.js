const mongoose=require('mongoose')

const InputSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'must provide name'],
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    password: {
        type: String,
        required: [true, 'must provide name'],
        // maxlength: [20, 'name can not be more than 20 characters'],
    },
  })
  
  module.exports = mongoose.model('Task', InputSchema)