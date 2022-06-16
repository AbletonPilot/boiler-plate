const express = require('express')
const app = express()

//http://localhost3000
const port = 3000

const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require("./Models/User");

//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//application/json
app.use(bodyparser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('ㅎㅇ')
})

app.post('/register', (req, res) => {
  //회원 가입할 때 필요한 정보들을  Client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)
  
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //이메일을 가진 유저가 한명도 없다면 user가 없다. 그럴때 return
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password , (err, isMatch ) => {
      //비밀번호가 틀리다면
      if(!isMatch)
       return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
      //비밀번호까지 맞다면 토큰 생성한다.
      user.generateToken((err, user) => {
        //에러가 있다면 400 에러 전달
        if(err) return res.status(400).send(err);
        //쿠키, 로컬스토리지 등 토큰을 저장한다. (지금은 쿠키)
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})