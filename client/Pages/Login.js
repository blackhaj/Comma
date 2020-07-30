import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'

export default function Login() {
  const { userData, logInUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form captures user input onChange and submits to logInUser from context API
  return (
    <form className={'login-panel'} onSubmit={(event) => {
      event.preventDefault()
      logInUser(email, password);
    }}>
      <div className="field">
        <label className="label is-medium">Login below...</label>
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <input type="submit" value="Login" className="button is-success" />
        </p>
      </div>
    </form>
  )
}
