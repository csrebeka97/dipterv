import './profile.css';

import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState, useRef, Component} from 'react';
import Cookies from 'js-cookie';

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
return (
	<div
	style={{
		display: 'flex',
		justifyContent: 'Right',
		alignItems: 'Right',
		height: '100vh'
	}}
	>
	<h1>helo {userdata.id}</h1>
	</div>
);
};

export default Profile;