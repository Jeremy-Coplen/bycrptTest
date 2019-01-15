import React, { Component } from 'react';
import axios from "axios"

class App extends Component {
  constructor() {
    super()

    this.state = {
      username: "",
      password: ""
    }
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = async () => {
    try {
      let loginRes = await axios.post("/api/secure-info", {username: this.state.username, password: this.state.password})
      if(loginRes.status === 200) {
        alert("You logged in!")
      }
    }
    catch(err) {
      if(err.response.status === 401) {
        alert("Username or password is incorrect.")
      }
      else {
        alert("Server Error")
      }
    }
  }

  render() {
    return (
      <div className="App">
        <input 
        type="text"
        placeholder="username"
        name="username"
        value={this.state.username}
        onChange={this.updateInput} />
        <input 
        type="password"
        placeholder="password"
        name="password"
        value={this.state.password}
        onChange={this.updateInput} />
        <button 
        disabled={(!this.state.username || !this.state.password)}
        onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default App;
