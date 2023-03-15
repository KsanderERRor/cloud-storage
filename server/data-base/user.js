const { Schema, model, } = require("mongoose");


const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true, lowerCase: true },
    password: { type: String, required: true, min: 8, max: 30 },
    discSpace: { type: Number, default: 1024 ** 3 * 10 },
    userSpace: { type: Number, default: 0 },
    avatar: { type: String, },
    // files: [{type: Schema.Types.ObjectId, ref:'File'  }]
})

module.exports = model('User', UserSchema)