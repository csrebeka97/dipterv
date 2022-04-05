import './readingtable.css';

import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState, useRef, Component} from 'react';
import Cookies from 'js-cookie';
import { Link} from "react-router-dom";
import Select from 'react-select';
import Table from 'react-bootstrap/Table';
import {Bar} from 'react-chartjs-2';

const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

const ReadingTable = () => {

	const [userdata, setUserData] = useState("");

	
	useEffect(() => {
        client.get(`http://localhost:8765/profiledata`)
            .then(res => {
                setUserData(res.data)
            });
    }, [])

	if (userdata.username === ""){
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
	<div id="container">
		<div id="search"></div>
		<div id="readingtable"></div>
		<div id="sugg"></div>
	</div>
);
}};

export default ReadingTable;