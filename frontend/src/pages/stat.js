import './stat.css';

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
import { Line } from 'react-chartjs-2';


const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;
  
const Stat = () => {

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

  const [userdata, setUserData] = useState("");
  const [olvasottKonyvek, setOlvasottKonyvek] = useState([]);
  const [chosenAuthor, setChosenAuthor] = useState("");
  const [chosenTag, setChosenTag] = useState("");


  useEffect(() => {
    client.get(`http://localhost:8765/profiledata`)
        .then(res => {
            setUserData(res.data)
        });
}, [])

useEffect(() => {
  if (userdata.username !== "") {
      client.get(`http://localhost:8765/olvasottKonyvek`)
          .then(res => {
              console.log(res.data)
              let tempid = 1
              let temp = res.data
              temp.map((i) => {
                  i.started = new Date(i.started)
                  i.id = tempid
                  tempid = tempid + 1;
                  i.ended = new Date(i.ended)
              })
              const toload = [...temp]
              setOlvasottKonyvek([...toload])
          })
  }
  }, [userdata])

  class AuthAggregator extends React.Component {
    render() {
        let authors = olvasottKonyvek.map(a => a.author)
        authors = authors.flat()
        let unique = [...new Set(authors)]

        const options = unique.map((u, index) => {
            return {
                label: u,
                value: u,
                key: index
            }
        })
        return (
            <div>
                <h3>Books read from <b>{unique.length}</b> different authors so far.</h3>
                <br/>
                <br/>
                <p>Select an author to see how many books You read from them:</p>
                <Select autosize={true} placeholder="Choose an author" value={options.filter(function (option) {
                    return option.value === chosenAuthor;
                })} options={options} onChange={e => {
                    setChosenAuthor(e.value)
                }}/>
                <br/>
                {chosenAuthor !== "" ? <p>You have read <b>{authors.filter(x => x === chosenAuthor).length} </b>books
                    from <b> {chosenAuthor} </b></p> : ""}
                <hr/>
            </div>
        )
    }
}
class TimeAggregator extends React.Component {
        render() {
            //"idén mennyit +   évszakonként mennyit"
            let started = olvasottKonyvek.map(a => a.started)
            let today = started.filter(x => x.getFullYear() === new Date().getFullYear()).length
            let spring = started.filter(x => x.getMonth() + 1 === 3 || x.getMonth() + 1 === 4 || x.getMonth() + 1 === 5).length
            let summer = started.filter(x => x.getMonth() + 1 === 6 || x.getMonth() + 1 === 7 || x.getMonth() + 1 === 8).length
            let autumn = started.filter(x => x.getMonth() + 1 === 9 || x.getMonth() + 1 === 10 || x.getMonth() + 1 === 11).length
            let winter = started.filter(x => x.getMonth() + 1 === 12 || x.getMonth() + 1 === 1 || x.getMonth() + 1 === 2).length
            const occurrences = started.reduce(function (acc, curr) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
              }, {});
              const timeChart = {
                labels: ["Spring", "Summer", "Autumn", "Winter"],
                datasets : [
                    {
                        label: "Seasons",
                        data:[spring, summer, autumn, winter],
                        backgroundColor: 'rgba(79, 235, 52)',
                        borderColor:  'rgba(79, 235, 52)'
                    }
                ]
            }
              return (<div>
        
                  This year you have read {today} books.
                  <br/>
                  <br/>
                  <Line data={timeChart} options={{ticks: {stepSize: 1}}}/>
              </div>)
          }
        }

    class TagAggregator extends React.Component {
      render() {
          let tags = olvasottKonyvek.map(a => a.tags)
          tags = tags.flat()
          let uniquetag = [...new Set(tags)]
          // "legsűrűbb tag  + tagselector abból mennyit"
          const options = uniquetag.map((u, index) => {
              return {
                  label: u,
                  value: u,
                  key: index
              }
          })
          return (
              <div>
                  <Select autosize={true} placeholder="Choose a tag" value={options.filter(function (option) {
                      return option.value === chosenTag;
                  })} options={options} onChange={e => {
                      setChosenTag(e.value)
                  }}/>
                  <br/>
                  {chosenTag !== "" ? <h4>You have read <b>{tags.filter(x => x === chosenTag).length} </b>books with
                     the  tag <b> {chosenTag} </b></h4> : ""}
                  <hr/>
              </div>
          )
      }
  }

  class TypeAggregator extends React.Component {
    render() {
        let type = olvasottKonyvek.map(a => a.type)
        const occurrences = type.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
          }, {});
          occurrences['Graphic Novel'] = occurrences['graphic'];
      delete occurrences['graphic'];
      occurrences['Audiobook'] = occurrences['audio'];
      delete occurrences['audio'];
      occurrences['Hardcover'] = occurrences['hard'];
      delete occurrences['hard'];
      occurrences['Paperback'] = occurrences['paper'];
      delete occurrences['paper'];
      occurrences['E-book'] = occurrences['ebook'];
      delete occurrences['ebook'];
          const formatChart = {
            labels: Object.keys(occurrences),
            datasets : [
                {
                    label: "Formats",
                    data:Object.values(occurrences),
                    backgroundColor: 'rgba(235, 147, 52)'
                }
            ]
        }
          return (<div>
              <Bar data={formatChart} options={{ticks: {stepSize: 1}}}/>
          </div>)
      }
    }

class LanguageAggregator extends React.Component {
  render() {
      let type = olvasottKonyvek.map(a => a.language)
      let hun = type.filter(x => x === "hun").length
      let eng = type.filter(x => x === "eng").length
      const occurrences = type.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
      occurrences['Hungarian'] = occurrences['hun'];
      delete occurrences['hun'];
      occurrences['English'] = occurrences['eng'];
      delete occurrences['eng']
      const langChart = {
        labels: Object.keys(occurrences),
        datasets : [
            {
                label: "Languages",
                data:Object.values(occurrences),
                backgroundColor: 'rgba(59, 74, 237)'
            }
        ]
    }
      return (<div>
          <Bar data={langChart} options={{ticks: {stepSize: 1}}}/>
      </div>)
  }
}
class ReadingTimeAggregator extends React.Component {
  render() {
      let diffTime = olvasottKonyvek.map(a => (a.ended-a.started)/(1000*60*60*24))
      diffTime = diffTime.sort((a, b) => a - b);
      let chartTime = diffTime.map(a => a.toFixed(1))
      const sum = diffTime.reduce((a, b) => a + b, 0);
      const avg = (sum / diffTime.length) || 0; 
      const occurrences = chartTime.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
      const readTimeChart = {
          labels: Object.keys(occurrences),
          datasets : [
              {
                  label: "Time to read a book",
                  data:Object.values(occurrences),
                  backgroundColor: 'rgba(235, 235, 52)'
              }
          ]
      }
      return (<div>

          The average time for you to read a book is: { avg.toFixed(2)} days.
          <br/>
          The maximum time for you to read a book is: {Math.max(...chartTime)} days.
          <br/>
          The minimum time for you to read a book is: {Math.min(...chartTime)} days.
          <Bar data={readTimeChart} options={{ticks: {stepSize: 1}}}/>
      </div>)
  }
}
class RatingAggregator extends React.Component {
  render() {
      let rate = olvasottKonyvek.map(a => a.rating)
      const sum = rate.reduce((a, b) => a + b, 0);
      const avg = (sum / rate.length) || 0;
      const occurrences = rate.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
      const ratingChart = {
        labels: Object.keys(occurrences),
        datasets : [
            {
                label: "Ratings",
                data:Object.values(occurrences),
                backgroundColor: 'rgba(204, 52, 235)'
            }
        ]
    }
      return (<div id="rateaggregator">

          You gave a {avg.toFixed(2)} average rating.
          <br/>
          <br/>
          <Bar data={ratingChart} options={{ticks: {stepSize: 1}}}/>
      </div>)
  }
}
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
    <div id="main">
     <div id="left">
         <div id="authaggregator">
         
       <AuthAggregator />
       </div>
       <div id="timeaggregator">
       <h3>Your reading during this year:</h3>
       <TimeAggregator />
       </div>
      
       <div id="tagaggregator">
           <p>Select a tag to see how many books You read about it:</p>
       <TagAggregator />
       </div>
       <div id="readingtimeaggregator">
           <h3>How long it takes to read a book:</h3>
       <ReadingTimeAggregator />
       </div>
     </div>
     <div id="right">
         <div id="typeaggregator">
             <h3>Formats You have read in:</h3>
       <TypeAggregator />
       </div>
       <div id="languageaggregator">
           <h3>Languages You have read:</h3> 
       <LanguageAggregator />
       </div>
       <div id="ratingaggregator">
       <h3>Your ratings:</h3>
       <RatingAggregator />
       </div>
      
     </div>
    </div>
);
}};

export default Stat;