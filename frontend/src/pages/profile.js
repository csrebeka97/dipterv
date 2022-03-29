import './profile.css';

import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState, useRef, Component} from 'react';
import Cookies from 'js-cookie';
import { Link} from "react-router-dom";

const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

const Profile = () => {
	const [userdata, setUserData] = useState("");

	useEffect(() => {
        client.get(`http://localhost:8765/profiledata`)
            .then(res => {
                setUserData(res.data)
            });
    }, [])

	if (userdata === ""){
		return (
			<div >
				<div>
				<br />
				<br />
				</div>
				<div id="loginneeded">
				<h1>You must login to see your profile</h1>
				<button id="loginbutton">
       			 <Link to="/login">
              			Login

            	 </Link> 
       </button> 
			</div>
			</div>
		)
	}
	else {
return (
	<div id="wrapper">
		<div id="profileinfo">
		<h1>{userdata.name}</h1>
			<h1>{userdata.id}</h1>
		</div>
		<div id="favorites">
			<h1>Favorite books</h1>
			<img src="https://moly.hu/system/covers/normal/covers_49254.jpg"></img>
		</div>
		<div>
			<h1>Daily reading tracker</h1>
		</div>
	</div>
);
	}
};

export default Profile;