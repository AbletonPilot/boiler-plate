const mongoose = require('mongoose');

//유저에 대한 스키마 설정
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//스키마를 모델로 감싸주는 설정
const User = mongoose.model('User', userSchema)

//다른 곳에서 사용할 수 있도록 설정
module.exports ={ User }