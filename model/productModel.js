

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name : {
        type: String,
        required : true,
    },
    price: {
        type: Number,
        default : this.original_price
       },
    original_price:{
      type: Number,
      required: true
    },
    description : {
           type: String
       },
  ratings: {
    type: Number,
    default: 0,
  },
    image:[{
        public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
    }],
    category: {
       type: String
    },
    Stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    discount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})


module.exports =  mongoose.model("product",productSchema)