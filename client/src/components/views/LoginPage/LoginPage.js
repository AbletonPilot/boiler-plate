// import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';


function LoginPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    //새로고침 방지
    event.preventDefault();
    // console.log('Email', Email)
    // console.log('Password', Password)
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if (response.payload.loginSuccess) {
        navigate('/')
      } else {
        alert('아이디 혹은 비밀번호가 틀립니다.')
      }
    })
  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
      >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />
          <br />
          <button type="submit">
              Login
          </button>
      </form>
  </div>
  )
}

export default LoginPage