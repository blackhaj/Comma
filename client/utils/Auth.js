class Auth {
  constructor() {
    this.authenticated = false;
    this.jwt = null;
  }

  addJWT(token) {
    this.jwt = token;
  }

  getJWT() {
    return this.jwt;
  }

  logOut() {
    this.authenticated = false;
  }

  logIn(email, password) {
    return fetch("/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          throw Error("Login failed, try again");
        } else {
          this.authenticated = true;
        }
      })
      
  }

  isAuthenticated() {
    return this.authenticated;
  }

  checkSession() {
    fetch('/api/session')
      .then((response) => {
        if (response.status === 201 || response.status === 304) {
          console.log("INSIDE CHECK SESSION Positive Condition")
          this.authenticated = true;
          return this.authenticated;
        } else {
          this.authenticated = false;
          return this.authenticated;
        }
      })
      .catch((error) => {
        this.authenticated = false;
        return this.authenticated;
      });
  }
}

export default new Auth();
