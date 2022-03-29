import './signup.css';

import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState, useRef, Component} from 'react';

const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

function SignUp() {
		const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [user, setUser] = useState("");


		useEffect(() => {
			client.post('http://localhost:8765/signup', {
            id: user.id,
			password: user.password,
			name: user.name,
			email: user.email
		}).then(console.log)
		}, [user]);

		function submitForm(){
			setUser({"id": username, "password": password, "name": name, "email": email})			
		}

	  return (
		  <div>
		  <h1> Sign Up Page</h1>	
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
		   <label>
			Name
			<br />
			<input type="text"  value={name} onChange={e => {setName(e.target.value)}} />
		  </label>
		  <br />
		  <br />
		  <label>
			E-mail
			<br />
			<input type="text"  value={email} onChange={e => {setEmail(e.target.value)}} />
		  </label>
		  <br />
		  <br />
		  <button type="button" onClick={submitForm}>Submit</button>
		</div>
	  );
	}
  export default SignUp;