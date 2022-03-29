import './login.css';

import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState, useRef, Component} from 'react';

const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

function Login() {
		const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
		const [user, setUser] = useState("");


		useEffect(() => {
			client.post('http://localhost:8765/login', {
            id: user.id,
			password: user.password
		}).then(function(response) {
			window.location.assign("./profile");
		  }).catch(function(error) {
			console.log('Error on Authentication');
		  })
		}, [user]);

		function submitForm(){
			setUser({"id": username, "password": password})			
		}

	  return (
		  <div>
		  <h1> Login</h1>	
		   <label>
			Username
			<br />
			<input type="text" required value={username} onChange={e => {setUsername(e.target.value)
			}} />
		  </label>
		  <br />
		  <br />
		  <label>
			Password
			<br />
			<input type="password" required value={password} onChange={e => {setPassword(e.target.value)}} />
		  </label>
		  <br />
		  <br />
		  <button type="button" onClick={submitForm}>Submit</button>
		</div>
	  );
	}
  export default Login;