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
import DatePicker from "react-datepicker";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';



const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

const ReadingTable = () => {
	const APIKEY = '6beefb0371b61e59b835542c6fbec081';
	const [userdata, setUserData] = useState("");
	const [startup, setStartup] = useState(true);
	const [kereses, setKereses] = useState("");
	const [konyvek, setKonyvek] = useState([]);
	const [ID, setID] = useState("");
	const [num, setNum] = useState(0);
	const [kereso, setKereso] = useState([]);
	const [olvasottKonyvek, setOlvasottKonyvek] = useState([]);
	const [kedvenc, setKedvenc] = useState([])
	const typeOptions = [{value: "ebook", label: "E-book"}, {value: "audio", label: "Audiobook"}, {
        value: "hard",
        label: "Hardcover"
    }, {value: "paper", label: "Paperback"}, {value: "graphic", label: "Graphic Novel"}];
	const languageOptions = [{value: "hun", label: "Hungarian"}, {value: "eng", label: "English"}];
	const ratingOptions = [{value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}, {
        value: 4,
        label: 4
    }, {value: 5, label: 5}];

	class Searchbar extends React.Component {
        render() {
            if (startup) {
                setStartup(false)
            }
            return (
                konyvek.map(({id, title, author}) => {
                    return (
                        <div>{title} <b>{author}</b><br/>
                            <button onClick={() => {
                                setID(id);
                                setNum(num + 1);
                                setKonyvek([]);
                                setKereses("")
                                setKereso("")
                            }}>
                                Reading
                            </button>
                            <hr/>
                        </div>
                    )
                }))
        }
    }

	class TrackerTable extends React.Component {
        render() {
            return (
                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Started</th>
                        <th>Ended</th>
                        <th>Tags</th>
                        <th width="200">Type</th>
                        <th width="200">Language</th>
                        <th width="100">Rating</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {olvasottKonyvek.map((item) => {
                        const index = olvasottKonyvek.findIndex((i) => item.id === i.id);
                        let updatedItem = ""
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.author.join(", ")}</td>
                                <td>{item.title}</td>
                                <td><DatePicker selected={item.started} onChange={e => {
                                    updatedItem = Object.assign({}, item, {started: e})
                                    setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), updatedItem, ...olvasottKonyvek.slice(index + 1)])
                                }}/></td>

                                <td><DatePicker selected={item.ended} onChange={e => {
                                    updatedItem = Object.assign({}, item, {ended: e})
                                    setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), updatedItem, ...olvasottKonyvek.slice(index + 1)])
                                }}/></td>
                                <td>{item.tags.join(", ")}</td>
                                <td><Select autosize={true} value={typeOptions.filter(function (option) {
                                    return option.value === item.type;
                                })} options={typeOptions} onChange={e => {
                                    updatedItem = Object.assign({}, item, {type: e.value})
                                    setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), updatedItem, ...olvasottKonyvek.slice(index + 1)])
                                }}/></td>
                                <td><Select autosize={true} value={languageOptions.filter(function (option) {
                                    return option.value === item.language;
                                })} options={languageOptions} onChange={e => {
                                    updatedItem = Object.assign({}, item, {language: e.value})
                                    setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), updatedItem, ...olvasottKonyvek.slice(index + 1)])
                                }}/></td>
                                <td><Select autosize={true} value={ratingOptions.filter(function (option) {
                                    return option.value === item.rating;
                                })} options={ratingOptions} onChange={e => {
                                    updatedItem = Object.assign({}, item, {rating: e.value})
                                    setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), updatedItem, ...olvasottKonyvek.slice(index + 1)])
                                }}/></td>
                                <td>
                                    <button class="btn" onClick={e => {
                                        setOlvasottKonyvek([...olvasottKonyvek.slice(0, index), ...olvasottKonyvek.slice(index + 1)])
                                    }}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
								<td>
                                    <button class="btn" onClick={e => {
                                       setKedvenc([...kedvenc, item.molyid]);
									   console.log("ez a kedvenc")
									   console.log(item.molyid)
                                    }}><FontAwesomeIcon icon={faHeart} /></button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            )
        }
    }
	useEffect(() => {
        client.get(`http://localhost:8765/profiledata`)
            .then(res => {
                setUserData(res.data)
            });
    }, [])

    useEffect(() => {
		if (userdata.username != "") {
        client.get(`http://localhost:8765/olvasottKonyvek`)
            .then(res => {
                console.log(res.data)
                let tempid = 1
                let temp = res.data
                temp.map((i) => {
                    i.started = new Date(i.started)
                    i.id = tempid
                    tempid = tempid + 1
                })
                const toload = [...temp]
                setOlvasottKonyvek([...toload])
            })
		}
    }, [userdata])

	useEffect(() => {
        if (olvasottKonyvek.length) {
            client.post('http://localhost:8765/olvasottKonyvek', {
                olvasottKonyvek: olvasottKonyvek
            }).then(console.log(olvasottKonyvek));
        }
    }, [olvasottKonyvek]);

	useEffect(() => {
        client.get(`https://moly.hu/api/books.json?q=${encodeURIComponent(kereses)}&key=${APIKEY}`)
            .then(res => {
                setKonyvek(res.data.books);
            });
    }, [kereso])


	useEffect(() => {
        client.get(`https://moly.hu/api/book/${encodeURIComponent(ID)}.json?key=${APIKEY}`
        )
            .then(res => {
                const current = new Date();
                const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
                const data = {
					molyid: ID,
                    id: num,
                    author: res.data.book["authors"].map(a => a.name),
                    title: res.data.book['title'],
                    started: current,
                    ended: "",
                    tags: res.data.book["tags"].map(a => a.name),
                    type: "",
                    rating: "",
                    language: ""
                }
                setOlvasottKonyvek([...olvasottKonyvek, data]);
            });
    }, [num])

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
		<div id="search">
		<input type="text" onChange={e => setKereses(e.target.value)} value={kereses}/>
    	 <button onClick={e => setKereso(kereses)}> Search</button>
			<Searchbar />
		</div>
		<div id="readingtable">
			<TrackerTable />
		</div>
		<div id="sugg">
			<h1>You may also like these:</h1>
		</div>
	</div>
);
}};

export default ReadingTable;