
import axios from 'axios';
import React, { useEffect, useState, useRef, Component } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";


const APIKEY ='6beefb0371b61e59b835542c6fbec081';

function App() {
  const [startup, setStartup] = useState(true)
  const [kereses, setKereses] = useState("");
  const [konyvek,setKonyvek] = useState([]);
  const [kereso, setKereso] = useState([]);
  const [olvasottKonyvek, setOlvasottKonyvek] = useState([])
  const [konyvData , setkonyvData] = useState([]);
  const [num, setNum] = useState(0);
  const [ID,setID] = useState("");
  const typeOptions = [{value:"ebook",label:"E-book"},{value:"audio",label:"Audiobook"},{value:"hard",label:"Hardcover"},{value:"paper",label:"Paperback"},{value:"graphic",label:"Graphic Novel"}];
  const ratingOptions = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5}];
  const languageOptions = [{value:"hun", label:"Hungarian"},{value:"eng", label:"English"}]
  const [chosenAuthor, setChosenAuthor] = useState("");
  const [chosenTag, setChosenTag] = useState("");
  const [checked, setChecked] = useState({"January":0,"February":0,"March":0,"April":0,"May":0,"June":0,"July":0,"August":0,"September":0,"October":0,"November":0,"December":0});
  let year = new Date()
  let days = [["January",31],["February",28],["March",31],["April",30],["May",31],["June",30],["July",31],["August",31],["September",30],["October",31],["November",30],["December",31]]
  const checkOptions = [{value:"January",label:"January"},{value:"February",label:"February"},{value:"March",label:"March"},{value:"April",label:"April"},{value:"May",label:"May"},{value:"June",label:"June"},{value:"July",label:"July"},{value:"August",label:"August"},{value:"September",label:"September"},{value:"October",label:"October"},{value:"November",label:"November"},{value:"December",label:"December"}]
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  const [currentlyChecked, setCurrentlyChecked] = useState(days[year.getMonth()-1][0])
  const [diff, setDiff] = useState(days[year.getMonth()-1][1]-28)
  const [betoltottKonyvek, SetBetoltottKonyvek] = useState([]);
  const [monthlyDays, setMonthlyDays] = useState([
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false},
    {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false, 20:false,21:false,22:false,23:false,24:false,25:false,26:false,28:false,29:false,30:false,31:false}])
  const [calendarData, setCalendarData] = useState( {
    labels: Object.keys(checked),
  datasets : [
    {
      label: 'Days read',
      data: Object.values(checked)
    }
  ] 
})
useEffect( () => {
  console.log(olvasottKonyvek)
}, [olvasottKonyvek])

 useEffect( () =>{
  axios.get(`http://localhost:8765/olvasottKonyvek`)
  .then(res =>{
    console.log(res.data)
    let tempid = 1
    let temp = res.data
    temp.map((i) => {
      i.started = new Date(i.started)
      i.id = tempid
      tempid = tempid+1
    })
    const toload = [...temp]
    setOlvasottKonyvek([...toload])
  })
}, []) 

useEffect(() => {
  if (olvasottKonyvek.length >0) {
axios.post('http://localhost:8765/olvasottKonyvek',{
olvasottKonyvek:olvasottKonyvek
}).then(console.log(olvasottKonyvek));
  }
}, [olvasottKonyvek]);

useEffect( () =>{
  axios.get(`http://localhost:8765/dailyTracker`)
  .then(res =>{
    setMonthlyDays([...res.data])
  });
}, [])  

 useEffect(() => {
  axios.post('http://localhost:8765/dailyTracker',{
   monthlyDays:monthlyDays
  }).then(console.log);
   }, [checked]); 

   useEffect( () =>{
    axios.get(`http://localhost:8765/checked`)
    .then(res =>{
      setChecked(res.data)
    });
  }, [])  
  
   useEffect(() => {
    axios.post('http://localhost:8765/checked',{
     checked:checked
    }).then(console.log);
     }, [checked]); 

     useEffect( () =>{
      axios.get(`http://localhost:8765/calendarData`)
      .then(res =>{
        setCalendarData(res.data)
        console.log(res.data)
      });
    }, [])  
    
     useEffect(() => {
      axios.post('http://localhost:8765/calendarData',{
       calendarData:calendarData
      }).then(console.log);
       }, [calendarData]);
 
useEffect( () =>{
    axios.get(`https://moly.hu/api/books.json?q=${encodeURIComponent(kereses)}&key=${APIKEY}`)
    .then(res =>{
      setKonyvek(res.data.books);
    });
  }, [kereso]) 

useEffect( () => {
  setCalendarData( {
    labels: Object.keys(checked),
  datasets : [
    {
      label: 'Days read',
      data: Object.values(checked)
    }
  ] 
})
console.log(calendarData)
}, [checked])


  useEffect( () =>{
    axios.get(`https://moly.hu/api/book/${encodeURIComponent(ID)}.json?key=${APIKEY}`      
    )
    .then(res =>{  
      const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      const data = {
      id : num,
      author: res.data.book["authors"].map(a => a.name),
      title : res.data.book['title'],
      started : current,
      ended : "",
      tags : res.data.book["tags"].map(a => a.name),
      type : "",
      rating : "",
      language: ""
      }
      setOlvasottKonyvek([...olvasottKonyvek,data]);
    });
  },[num])

  
class Searchbar extends React.Component {
render(){
  if (startup) {setStartup(false)}
return(
  konyvek.map(({id,title,author}) => {
    return (
    <div>{title} <b>{author}</b><br />
    <button onClick={() =>{
      setID(id);
      setNum(num+1);
      setKonyvek([]);
      setKereses("")
      setKereso("")
      }}> 
      Reading </button>
    <hr />
 </div>
    ) } ) ) } }

class Readingtable extends React.Component {
render() {
return (
  <Table striped bordered hover>
    <thead>
      <tr>
       <th>#</th>
       <th>Author</th>
       <th>Title</th>
        <th>Started  </th>
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
     <td> <DatePicker selected={item.started} onChange={e => {updatedItem = Object.assign({}, item,{started:e}) 
    setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),updatedItem,...olvasottKonyvek.slice(index+1)])
    }} /></td>

      <td><DatePicker selected={item.ended} onChange={e => {updatedItem = Object.assign({}, item,{ended:e}) 
    setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),updatedItem,...olvasottKonyvek.slice(index+1)])
    }} /></td>
      <td>{item.tags.join(", ")}</td>
      <td> <Select autosize={true} value= {typeOptions.filter(function(option) {
          return option.value === item.type;
        })} options={typeOptions} onChange={e => {updatedItem = Object.assign({}, item,{type:e.value})
      setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),updatedItem,...olvasottKonyvek.slice(index+1)])
    }} /></td>
    <td> <Select autosize={true} value= {languageOptions.filter(function(option) {
          return option.value === item.language;
        })} options={languageOptions} onChange={e => {updatedItem = Object.assign({}, item,{language:e.value})
        setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),updatedItem,...olvasottKonyvek.slice(index+1)])
    }} /></td>
      <td> <Select autosize={true} value= {ratingOptions.filter(function(option) {
          return option.value === item.rating;
        })} options={ratingOptions} onChange={e => {updatedItem = Object.assign({}, item,{rating:e.value})
        setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),updatedItem,...olvasottKonyvek.slice(index+1)])
    }} /></td>
    <td><button class="btn" onClick={e => {
      setOlvasottKonyvek([...olvasottKonyvek.slice(0,index),...olvasottKonyvek.slice(index+1)])
    }}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
    </tr>
        );
  })}
</tbody>
  </Table>
)}}

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
    return(       
      <div>
        <hr />
          Books read from <b>{unique.length}</b> different authors so far.
         <br/>  
         <br/>
           
         <Select autosize={true} placeholder="Choose an author" value={options.filter(function(option) {
          return option.value ===chosenAuthor;
        })} options={options} onChange={e => {setChosenAuthor(e.value)
        }} />
        <br />
        {chosenAuthor !== "" ? <p>You have read <b>{authors.filter(x => x === chosenAuthor).length } </b>books from <b> {chosenAuthor} </b></p>: ""}
          <hr />
         </div>
       )
  }
}

class TimeAggregator extends React.Component {
  render() {
    //"idén mennyit +   évszakonként mennyit" 
    let started = olvasottKonyvek.map(a => a.started)
    let today = started.filter (x => x.getFullYear() === new Date().getFullYear() ).length
    let spring = started.filter( x => x.getMonth()+1 === 3 || x.getMonth()+1 === 4 || x.getMonth()+1 === 5).length
    let summer = started.filter( x => x.getMonth()+1 === 6 || x.getMonth()+1 === 7 || x.getMonth()+1 === 8).length
    let autumn = started.filter( x => x.getMonth()+1 === 9 || x.getMonth()+1 === 10 || x.getMonth()+1 === 11).length
    let winter = started.filter( x => x.getMonth()+1 === 12 || x.getMonth()+1 === 1 || x.getMonth()+1 === 2).length

    return( 
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
        )  }}
    
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
    return(
      <div>        
        <Select autosize={true} placeholder="Choose a tag" value={options.filter(function(option) {
          return option.value ===chosenTag;
        })} options={options} onChange={e => {setChosenTag(e.value)
        }} />
        <br />
        {chosenTag !== "" ? <p>You have read <b>{tags.filter(x => x === chosenTag).length } </b>books with tag <b> {chosenTag} </b></p>: ""}
        <hr/>
      </div>
     )
  }
}

class TypeAggregator extends React.Component {
  render() {
    let type = olvasottKonyvek.map(a => a.type)
    let hard = type.filter( x => x === "hard" ).length
    let paper = type.filter( x => x === "paper" ).length
    let ebook = type.filter( x => x === "ebook" ).length
    let audio = type.filter( x => x === "audio" ).length
    let graphic = type.filter( x => x === "graphic" ).length
  return( <div id="typeaggregator">
   
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
    </div> )
  }
}
class LanguageAggregator extends React.Component {
  render() {
    let type = olvasottKonyvek.map(a => a.language)
    let hun = type.filter( x => x === "hun" ).length
    let eng = type.filter( x => x === "eng" ).length
  return( <div>
      
        You have read <b>{hun} </b> Hungarian books.
        <br/>
        <br/>
        You have read <b>{eng} </b> English books.
        <hr/>
    </div> )
  }
}

class RatingAggregator extends React.Component {
  render() {
    let rate = olvasottKonyvek.map(a => a.rating)
    const sum = rate.reduce((a, b) => a + b, 0);
    const avg = (sum / rate.length) || 0;
    let one = rate.filter( x => x === 1 ).length
    let two = rate.filter( x => x === 2 ).length
    let three = rate.filter( x => x === 3 ).length
    let four = rate.filter( x => x === 4 ).length
    let five = rate.filter( x => x === 5 ).length
    return(  <div id="rateaggregator">
      
      You gave a {avg.toFixed(2)} average rating.
      <br/>
      <br/>
      You gave  <b>{one}</b> 1-star rating.
      <br/>
      <br/>
      You gave  <b>{two}</b> 2-star rating.
      <br/>
      <br/>
      You gave  <b>{three}</b> 3-star rating.
      <br/>
      <br/>
      You gave  <b>{four}</b> 4-star rating.
      <br/>
      <br/>
      You gave  <b>{five}</b> 5-star rating.
    </div> )
  }
}

class CalendarDiagram extends React.Component{
  render() {
    return( 
      <Bar data={calendarData} height={100} options={{ ticks: {stepSize: 1 } }}/>
    )
  }
}

class Checker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      week1: range(1,7,1),
      week2: range(8,14,1),
      week3:  range(15,21,1),
      week4:  range(22,28,1),
      leap: (year.getFullYear() % 100 === 0) ? (year.getFullYear() % 400 === 0) : (year.getFullYear() % 4 === 0),
      week5:  diff == 0 ? [] : diff == 1 ? [29] :diff == 2 ? [29,30] : [29,30,31],
      dIndex:  days.findIndex((item) => item[0] === currentlyChecked)
    };
  }  
  render()
    {   
      let index =0;
  if (this.state.leap) { days[1][1]=29;}
    return (<div>
      
      <Select autosize={true} selectedValue={currentlyChecked}  value={checkOptions.filter(function(option) {
          return (option.value == currentlyChecked)
        })
      }
           options={checkOptions} onChange={e => {
            setCurrentlyChecked(e.value)
            const index = days.findIndex((item) => item[0] === e.value)     
            setDiff(days[index][1]-28)       
                     
              this.setState( {
              week5: diff == 0 ? [] : diff == 1 ? [29] :diff == 2 ? [29,30] : [29,30,31], dIndex: index      
            }, () => {return this.state.week5, this.state.dIndex} )
        
           }} />
      <Table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            {this.state.week1.map((i) => <td>{i}  <input checked={monthlyDays[this.state.dIndex][i]} type="checkbox"  onChange={e => {
            if (e.target.checked) {
              let updated = monthlyDays[this.state.dIndex]
              updated[i] = true
            const cIndex = currentlyChecked;
            const copy = {...checked}
            copy[cIndex] = copy[cIndex]+1
            setChecked(copy)
            }
            else {
              let updated =  monthlyDays[this.state.dIndex]
              updated[i] = false
            const index = currentlyChecked;
            const copy = {...checked}
            copy[index] = copy[index]-1
            setChecked(copy)
            }
            }}></input>
</td>)}
          </tr>
          <tr>
            {this.state.week2.map((i) => <td>{i}  <input  checked={monthlyDays[this.state.dIndex][i]} type="checkbox" onChange={e => {
            if (e.target.checked) {
              let updated = monthlyDays[this.state.dIndex]
              updated[i] = true
            const cIndex = currentlyChecked;
            const copy = {...checked}
            copy[cIndex] = copy[cIndex]+1
            setChecked(copy)
            }
            else {
              let updated =  monthlyDays[this.state.dIndex]
              updated[i] = false
            const index = currentlyChecked;
            const copy = {...checked}
            copy[index] = copy[index]-1
            setChecked(copy)
            }
            }}></input></td>)}
          </tr>
          <tr>
            {this.state.week3.map((i) => <td>{i} <input checked={monthlyDays[this.state.dIndex][i]} type="checkbox" onChange={e => {
             if (e.target.checked) {
              let updated = monthlyDays[this.state.dIndex]
              updated[i] = true
            const cIndex = currentlyChecked;
            const copy = {...checked}
            copy[cIndex] = copy[cIndex]+1
            setChecked(copy)
            }
            else {
              let updated =  monthlyDays[this.state.dIndex]
              updated[i] = false
            const index = currentlyChecked;
            const copy = {...checked}
            copy[index] = copy[index]-1
            setChecked(copy)
            }
            }}></input></td>)}
          </tr>
          <tr>
            {this.state.week4.map((i)=> <td>{i}  <input checked={monthlyDays[this.state.dIndex][i]} type="checkbox" onClick={e => {
               if (e.target.checked) {
                let updated = monthlyDays[this.state.dIndex]
                updated[i] = true
              const cIndex = currentlyChecked;
              const copy = {...checked}
              copy[cIndex] = copy[cIndex]+1
              setChecked(copy)
              }
              else {
                let updated =  monthlyDays[this.state.dIndex]
                updated[i] = false
              const index = currentlyChecked;
              const copy = {...checked}
              copy[index] = copy[index]-1
              setChecked(copy)
              }
            }}></input></td>)}
          </tr>
          <tr>          
            {this.state.week5.map((i) => <td>{i} <input  checked={monthlyDays[this.state.dIndex][i]} type="checkbox" onChange={e => {
             if (e.target.checked) {
              let updated = monthlyDays[this.state.dIndex]
              updated[i] = true
            const cIndex = currentlyChecked;
            const copy = {...checked}
            copy[cIndex] = copy[cIndex]+1
            setChecked(copy)
            }
            else {
              let updated =  monthlyDays[this.state.dIndex]
              updated[i] = false
            const index = currentlyChecked;
            const copy = {...checked}
            copy[index] = copy[index]-1
            setChecked(copy)
            }
            }}></input></td>)}
          </tr>
        </tbody>
      </Table>
    </div>)
  }
}

return (
  
      <div>
        <h1>Reading dashboard</h1>
    <div className = "rowC">
       <div>    
         <input type="text" onChange={e => setKereses(e.target.value)} value={kereses}/>
          <button onClick={e => setKereso(kereses)}> Search</button>           
          <Searchbar />
          <br />
          <AuthAggregator />
          <br />
          <TimeAggregator />
          <br />
          <TagAggregator />
          <br />
          <TypeAggregator />
          <br />
          <LanguageAggregator />
          <br />
          <RatingAggregator />
          <br />
         
          </div>
          <div>
          <Readingtable />
          <br />
          <Checker />
          <br />
          <div height="175">
          <CalendarDiagram />
          </div>
          </div>
       </div>
    </div>
  );}

export default App;
