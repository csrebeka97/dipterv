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



const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;
  
const Stat = () => {
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
                <hr/>
                Books read from <b>{unique.length}</b> different authors so far.
                <br/>
                <br/>

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

            return (
                <div id="timeaggregator">
                    This year you have read <b>{today}</b> books.
                    <br/>
                    <br/>
                    You have read <b>{spring}</b> books in spring.
                    <br/>
                    <br/>
                    You have read <b>{summer}</b> books in summer.
                    <br/>
                    <br/>
                    You have read <b>{autumn}</b> books in autumn.
                    <br/>
                    <br/>
                    You have read <b>{winter}</b> books in winter.
                    <hr/>
                </div>
            )
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
                  {chosenTag !== "" ? <p>You have read <b>{tags.filter(x => x === chosenTag).length} </b>books with
                      tag <b> {chosenTag} </b></p> : ""}
                  <hr/>
              </div>
          )
      }
  }

  class TypeAggregator extends React.Component {
    render() {
        let type = olvasottKonyvek.map(a => a.type)
        let hard = type.filter(x => x === "hard").length
        let paper = type.filter(x => x === "paper").length
        let ebook = type.filter(x => x === "ebook").length
        let audio = type.filter(x => x === "audio").length
        let graphic = type.filter(x => x === "graphic").length
        return (<div id="typeaggregator">

            You have read <b>{hard} </b> hardcover books.
            <br/>
            <br/>
            You have read <b>{paper} </b> paperback books.
            <br/>
            <br/>
            You have read <b> {ebook} </b>E-books.
            <br/>
            <br/>
            You have read <b> {graphic} </b> graphic novels.
            <br/>
            <br/>
            You have listened to <b> {audio} </b> audiobooks.
            <hr/>
        </div>)
    }
}

class LanguageAggregator extends React.Component {
  render() {
      let type = olvasottKonyvek.map(a => a.language)
      let hun = type.filter(x => x === "hun").length
      let eng = type.filter(x => x === "eng").length
      return (<div>

          You have read <b>{hun} </b> Hungarian books.
          <br/>
          <br/>
          You have read <b>{eng} </b> English books.
          <hr/>
      </div>)
  }
}

class ReadingTimeAggregator extends React.Component {
  render() {
      let diffTime = olvasottKonyvek.map(a => (a.ended-a.started)/(1000*60*60*24))
      const sum = diffTime.reduce((a, b) => a + b, 0);
      const avg = (sum / diffTime.length) || 0; 
      return (<div>

          The average time for you to read a book is: {avg.toFixed(2)} days.
          <br/>
          <hr/>
      </div>)
  }
}
class RatingAggregator extends React.Component {
  render() {
      let rate = olvasottKonyvek.map(a => a.rating)
      const sum = rate.reduce((a, b) => a + b, 0);
      const avg = (sum / rate.length) || 0;
      let one = rate.filter(x => x === 1).length
      let two = rate.filter(x => x === 2).length
      let three = rate.filter(x => x === 3).length
      let four = rate.filter(x => x === 4).length
      let five = rate.filter(x => x === 5).length
      return (<div id="rateaggregator">

          You gave a {avg.toFixed(2)} average rating.
          <br/>
          <br/>
          You gave <b>{one}</b> 1-star rating.
          <br/>
          <br/>
          You gave <b>{two}</b> 2-star rating.
          <br/>
          <br/>
          You gave <b>{three}</b> 3-star rating.
          <br/>
          <br/>
          You gave <b>{four}</b> 4-star rating.
          <br/>
          <br/>
          You gave <b>{five}</b> 5-star rating.
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
       <AuthAggregator />
       <TimeAggregator />
       <TagAggregator />
     </div>
     <div id="right">
       <TypeAggregator />
       <LanguageAggregator />
       <RatingAggregator />
       <ReadingTimeAggregator />
     </div>
    </div>
);
}};

export default Stat;