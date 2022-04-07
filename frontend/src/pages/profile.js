import './profile.css';

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



function Profile() {
	const [userdata, setUserData] = useState("");
    const [kedvenc, setKedvenc] = useState("");
	const [genreclick, setGenreClick] = useState(false);
	const [genreedited, setGenreEdited] = useState(false);
	const [introclick, setIntroClick] = useState(false);
	const [introedited, setIntroEdited] = useState(false);
	const [monthlyDays, setMonthlyDays] = useState("");
	const range = (start, stop, step) => Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));
	let year = new Date()
	let days = [["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31], ["June", 30], ["July", 31], ["August", 31], ["September", 30], ["October", 31], ["November", 30], ["December", 31]]
	const [diff, setDiff] = useState(days[year.getMonth() - 1][1] - 28)	
	const [currentlyChecked, setCurrentlyChecked] = useState(days[year.getMonth() - 1][0])
	const checkOptions = [{value: "January", label: "January"}, {value: "February", label: "February"}, {
        value: "March",
        label: "March"
    }, {value: "April", label: "April"}, {value: "May", label: "May"}, {value: "June", label: "June"}, {
        value: "July",
        label: "July"
    }, {value: "August", label: "August"}, {value: "September", label: "September"}, {
        value: "October",
        label: "October"
    }, {value: "November", label: "November"}, {value: "December", label: "December"}]
	const [checked, setChecked] = useState({
        "January": 0,
        "February": 0,
        "March": 0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0
    });

	const [calendarData, setCalendarData] = useState({
        labels: Object.keys(checked),
        datasets: [
            {
                label: 'Days read',
                data: Object.values(checked)
            }
        ]
    })

	class Checker extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                week1: range(1, 7, 1),
                week2: range(8, 14, 1),
                week3: range(15, 21, 1),
                week4: range(22, 28, 1),
                leap: (year.getFullYear() % 100 === 0) ? (year.getFullYear() % 400 === 0) : (year.getFullYear() % 4 === 0),
                week5: diff == 0 ? [] : diff == 1 ? [29] : diff == 2 ? [29, 30] : [29, 30, 31],
                dIndex: days.findIndex((item) => item[0] === currentlyChecked)
            };
        }

        render() {
            let index = 0;
            if (this.state.leap) {
                days[1][1] = 29;
            }
            return (<div>

                <Select autosize={true} selectedValue={currentlyChecked} value={checkOptions.filter(function (option) {
                    return (option.value == currentlyChecked)
                })
                }
                        options={checkOptions} onChange={e => {
                    setCurrentlyChecked(e.value)
                    const index = days.findIndex((item) => item[0] === e.value)
                    setDiff(days[index][1] - 28)

                    this.setState({
                        week5: diff == 0 ? [] : diff == 1 ? [29] : diff == 2 ? [29, 30] : [29, 30, 31], dIndex: index
                    }, () => {
                        return this.state.week5, this.state.dIndex
                    })

                }}/>
                <Table>
                    <thead>
                    <tr>
						<th width="150"></th>
						<th width="150"></th>
						<th width="150"></th>
						<th width="150"></th>
						<th width="150"></th>
						<th width="150"></th>
						<th width="150"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {this.state.week1.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]}
                                                                    type="checkbox" onChange={e => {
                            if (e.target.checked) {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = true
                                const cIndex = currentlyChecked;
                                const copy = {...checked}
                                copy[cIndex] = copy[cIndex] + 1
                                setChecked(copy)
                            } else {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = false
                                const index = currentlyChecked;
                                const copy = {...checked}
                                copy[index] = copy[index] - 1
                                setChecked(copy)
                            }
                        }}></input>
                        </td>)}
                    </tr>
                    <tr>
                        {this.state.week2.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]}
                                                                    type="checkbox" onChange={e => {
                            if (e.target.checked) {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = true
                                const cIndex = currentlyChecked;
                                const copy = {...checked}
                                copy[cIndex] = copy[cIndex] + 1
                                setChecked(copy)
                            } else {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = false
                                const index = currentlyChecked;
                                const copy = {...checked}
                                copy[index] = copy[index] - 1
                                setChecked(copy)
                            }
                        }}></input></td>)}
                    </tr>
                    <tr>
                        {this.state.week3.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]}
                                                                    type="checkbox" onChange={e => {
                            if (e.target.checked) {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = true
                                const cIndex = currentlyChecked;
                                const copy = {...checked}
                                copy[cIndex] = copy[cIndex] + 1
                                setChecked(copy)
                            } else {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = false
                                const index = currentlyChecked;
                                const copy = {...checked}
                                copy[index] = copy[index] - 1
                                setChecked(copy)
                            }
                        }}></input></td>)}
                    </tr>
                    <tr>
                        {this.state.week4.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]}
                                                                    type="checkbox" onClick={e => {
                            if (e.target.checked) {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = true
                                const cIndex = currentlyChecked;
                                const copy = {...checked}
                                copy[cIndex] = copy[cIndex] + 1
                                setChecked(copy)
                            } else {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = false
                                const index = currentlyChecked;
                                const copy = {...checked}
                                copy[index] = copy[index] - 1
                                setChecked(copy)
                            }
                        }}></input></td>)}
                    </tr>
                    <tr>
                        {this.state.week5.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]}
                                                                    type="checkbox" onChange={e => {
                            if (e.target.checked) {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = true
                                const cIndex = currentlyChecked;
                                const copy = {...checked}
                                copy[cIndex] = copy[cIndex] + 1
                                setChecked(copy)
                            } else {
                                let updated = monthlyDays[this.state.dIndex]
                                updated[i] = false
                                const index = currentlyChecked;
                                const copy = {...checked}
                                copy[index] = copy[index] - 1
                                setChecked(copy)
                            }
                        }}></input></td>)}
                    </tr>
                    </tbody>
                </Table>
            </div>)
        }
    }

	class CalendarDiagram extends React.Component {
        render() {
            return (
                <Bar data={calendarData} height={100} options={{ticks: {stepSize: 1}}}/>
            )
        }
    }

    class FavoriteBooks extends React.Component {
        render() {
            return (
                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                          </tr>
                    </thead>
                    <tbody>
                    {kedvenc.map((item) => {
                        const index = kedvenc.findIndex((i) => item.id === i.id);
                                               return (
                            <tr>
                                <td><img src={item.cover}></img></td>
                                <td>{item.author.join(", ")}</td>
                                <td>{item.title}</td>                                
                                 </tr>
                        );
                    })}
                    </tbody>
                </Table>
            )
        }
    }

	useEffect(() => {
        client.get(`http://localhost:8765/dailyTracker`)
            .then(res => {
                setMonthlyDays([...res.data])
            });
    }, [])

    useEffect(() => {
        if(userdata.username != "") {
        client.get(`http://localhost:8765/favorites`)
            .then(res => {
                setKedvenc([...res.data])
            });
        }
    }, [userdata])

	useEffect(() => {
		if(monthlyDays != ""){
        client.post('http://localhost:8765/dailyTracker', {
            monthlyDays: monthlyDays
        }).then(console.log);
	}
    }, [checked]);

	useEffect(() => {
        client.get(`http://localhost:8765/checked`)
            .then(res => {
                setChecked(res.data)
            });
    }, [])

	useEffect(() => {
        client.get(`http://localhost:8765/calendarData`)
            .then(res => {
                setCalendarData(res.data)
                console.log(res.data)
            });
    }, [])

	useEffect(() => {
        client.post('http://localhost:8765/calendarData', {
            calendarData: calendarData
        }).then(console.log);
    }, [calendarData]);

	useEffect(() => {
        setCalendarData({
            labels: Object.keys(checked),
            datasets: [
                {
                    label: 'Days read',
                    data: Object.values(checked)
                }
            ]
        })
        console.log(calendarData)
    }, [checked])

	useEffect(() => {
        var arr = []
        Object.keys(checked).forEach(k => {
            arr.push(checked[k])});
         if (Math.max(...arr) > 0) {
        client.post('http://localhost:8765/checked', {
            checked: checked
        }).then(console.log);
        }   
    }, [checked]);

	useEffect(() => {
        client.get(`http://localhost:8765/profiledata`)
            .then(res => {
                setUserData(res.data)
            });
    }, [])

	useEffect(() => {
		if(userdata != "") {
		client.post('http://localhost:8765/profiledata', {
			userdata: userdata
		}).then(console.log);
	}
	}, [userdata]);

useEffect(() => {
        if(genreedited ===true){
			var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
		for (var i = 0; i < checkboxes.length; i++) {
 		 array.push(checkboxes[i].value)
			}
		setGenreClick(false)
		setGenreEdited(false)
		setUserData({"username": userdata.username, "name": userdata.name, "genres":array, "introduction": userdata.introduction})
		}
    }, [genreedited]) 

	useEffect(() => {
        if(introedited ===true){
		var introd = document.getElementsByName("intro")[0].value
		setIntroClick(false)
		setIntroEdited(false)
		if(introd != {}){
		setUserData({"username": userdata.username, "name": userdata.name, "genres":userdata.genres, "introduction": introd})
		}
	}
    }, [introedited]) 

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
			<h1>{userdata.username}</h1>	
			<h2>Favorite genres:</h2>			
			
			{(() => {
              if (genreclick == false){
                  return (
					  <div>
					{userdata.genres.map((i) => <p>{i}</p>)}
					<button onClick={(e) => {setGenreClick(true)}}>Edit</button>
					</div>     )}
              else {
				  return (
					  <div>
<label><input type="checkbox" name="genre" value="Horror"></input>Horror</label>
		<label><input type="checkbox" name="genre" value="Thriller"></input>Thriller</label>
		<label><input type="checkbox" name="genre" value="Romantic"></input>Romantic</label>
		<label><input type="checkbox" name="genre" value="LMBT"></input>LMBT</label>
		<label><input type="checkbox" name="genre" value="Classical"></input>Classical</label>
		<label><input type="checkbox" name="genre" value="Sci-fi"></input>Sci-fi</label>
		<label><input type="checkbox" name="genre" value="Fantasy"></input>Fantasy</label>
		<label><input type="checkbox" name="genre" value="Crime stories"></input>Crime stories</label>
<button type='button' onClick={(e) => {setGenreEdited(true)}}>Submit</button>
</div>				  )}
            })()}
			<h2>About Me</h2>
			{(() => {
              if (introclick == false){
                  return (
					  <div>
					  <p>{userdata.introduction}</p>
					  <button onClick={(e) => {setIntroClick(true)}}>Edit</button>
					  </div>
					  )
              }
              else {
				return(
					<div>
					<textarea id="intro" name="intro"></textarea>
					<button type='button' onClick={(e) => {setIntroEdited(true)}}>Submit</button>
					</div>
				)
			  }
            })()}
			
		</div>
		<div id="favorites">
			<h1>Favorite books</h1>
			<FavoriteBooks />>
		</div>
		<div id="dailytrack">
			<h1>Daily reading tracker</h1>
			<Checker/>
			<br/>
			<div height="175">
                        <CalendarDiagram/>
                    </div>
		</div>
	</div>
);
	}
};

export default Profile;