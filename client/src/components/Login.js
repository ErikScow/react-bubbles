import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../AxiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const changeHandler = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const history = useHistory()

  const submitHandler = e => {
    e.preventDefault()
    axiosWithAuth().post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/protected')
      })
      .catch(err => console.error(err))
  } 

  return (
    <div>
      <h1>Welcome to Bubble Page</h1>
      <form onSubmit={submitHandler} className='login-form'>
        <input 
        type='text'
        name='username'
        value={credentials.username}
        onChange={changeHandler}
        placeholder='username'
        />
        <input 
        type='text' //leaving this as text (rather than password) so its easier to read and test during dev.
        name='password'
        value={credentials.password}
        onChange={changeHandler}
        placeholder='password'
        />

        <button type='submit'>Login</button>
      </form>
    </div>

  );
};

export default Login;
