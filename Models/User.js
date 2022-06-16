const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//salt를 이용해서 비밀번호를 암호화 해야한다. 그 중 salt의 문자 길이
const saltRounds = 10

const jwt = require('jsonwebtoken');

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
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
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

//유저 모델의 정보를 저장하기 전에 fungtion을 한다
userSchema.pre('save', function(next) {
    //user = userSchema
    var user = this;
    //비밀번호를 바꿀때만 암호화 시키는 조건
    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        //비크립트 가져오고 솔트 생성, 솔트 = 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                //패스워드 암호화 성공하면 유저 패스워드를 hash로 교체
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

//로그인 시 비밀번호 확인
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 유저의 비밀번호와 암호화된 비밀번호가 같은지 확인한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        //비밀번호가 맞지 않다면 리턴해서 cb
        if(err) return cb(err);
        //비밀번호가 맞다면 cb
        cb(null, isMatch);
    })
}

//로그인 시 토큰 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jsonwebtoken을 이용해서 token을 생성하기
    //유저의 아이디와 secretToken을 합쳐서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        //에러가 있다면 return, cb로 에러 전달
        if(err) return cb(err)
        //save가 잘 됬으면 유저 정보 전달
        cb(null, user)
    })
}

//스키마를 모델로 감싸주는 설정
const User = mongoose.model('User', userSchema)

//다른 곳에서 사용할 수 있도록 설정
module.exports ={ User }