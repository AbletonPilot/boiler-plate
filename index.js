const express = require('express')
const app = express()

//http://localhost3000
const port = 3000

const bodyparser = require('body-parser');
const config = require('./config/key');

const { User } = require("./Models/User");

//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//application/json
app.use(bodyparser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('ㅎㅇ')
})

app.post('/register', (req, res) => {
  //회원 가입 할 때 필요한 정보들을  Client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})