import React from 'react';
import auth from "../../utils/Auth.js";
import { Redirect } from "react-router-dom";
import Title from '../Title.jsx';

export default function SignIn(props) {
  return (
    <div className='signin-container'>
      <Title title={"Sign In"}/>
      <form onSubmit={(event) => {
        event.preventDefault()
        auth.logIn(event.target[0].value, event.target[1].value)
        .then(()=> props.history.push('/'))
        // .catch((error) => {
        //   console.log(error)
        //   alert('Login Failed, try again')
        //   })
        }}>
        <input type="email" placeholder="Email.."/>
        <input type="password" placeholder="Password.."/>
        <button type="submit">
          Sign In
        </button>
      </form>
      
    </div>
  )
}
