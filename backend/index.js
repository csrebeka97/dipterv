const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const passport = require('passport');
const LokiLocal = require('loki-local-passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
fs = require('fs')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'mistery',
    cookie: {
        secure: false,
        httpOnly: false
    }
}));
app.use(passport.initialize({}));
app.use(passport.session({
    secret: 'mistery',
    cookie: {
        secure: false
    },
    httpOnly: false
}));
app.use(flash());
app.use(cors({
    credentials: true, origin: ['http://localhost:3000'],exposedHeaders: ["set-cookie"]
}));
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function dailygenerate(){
    daily = []
    for (var month = 0; month <12; month++){
        var monthObject = {};
        var len = 0;
        if (month == 1){ len = 29;}
        else if (month == 3 || month == 5 || month == 8 || month == 10) {len = 30;}
        else {len = 31;}
        for (var day = 1 ; day <= len; day ++) {
            text = day.toString()
            monthObject[text] = false;
        }
        daily.push(monthObject)
    }
    return daily;
}

function generatefiles(user){
    var dirname  = `./data/${user.id}`;
    var data = JSON.stringify([]);
      fs.mkdirSync(dirname, {recursive: true});
      fs.writeFile(`${dirname}/konyvek.json`, data, (err) => {
        if (err) throw err;
    })
      fs.writeFile(`${dirname}/calendarData.json`, calendar, (err) => {
        if (err) throw err;
    })
      fs.writeFile(`${dirname}/checked.json`, checkeddata, (err) => {
        if (err) throw err;
    })
      fs.writeFile(`${dirname}/daily.json`, JSON.stringify(dailydata), (err) => {
        if (err) throw err;
    })
    userdata.username = user.id;
    userdata.name = user.name;
     fs.writeFile(`${dirname}/userdata.json`, JSON.stringify(userdata), (err) => {
        if (err) throw err;
    })
}

const checkeddata = JSON.stringify({"labels":["January","February","March","April","May","June","July","August","September","October","November","December"],"datasets":[{"label":"Days read","data":[0,0,0,0,0,0,0,0,0,0,0,0]}]})
const APIKEY = '6beefb0371b61e59b835542c6fbec081';
const calendar = JSON.stringify({"labels":["January","February","March","April","May","June","July","August","September","October","November","December"],"datasets":[{"label":"Days read","data":[0,0,0,0,0,0,0,0,0,0,0,0]}]})
let userdata = {"username": "", "name": "", "genres": "", "introduction": ""}
let dailydata = dailygenerate();
app.post(
    '/login',
    LokiLocal.use('login', {mode: 'debug'}),
    (req, res, next) => {
    userdata = req.user
    let olvasottKonyvek = require('./konyvek.json');
let monthlyDays = require('./daily.json');
let calendarData = require('./calendarData.json')
let checked = require('./checked.json')
      return res.json(req.user)
    });

app.get('/profiledata', function (req, res, next) {
    return res.json(userdata);
})
app.post(
    '/signup',
    LokiLocal.use('signup', {mode: 'debug'}),
    (req, res, next) => {
        generatefiles(req.user);
         return res.json(req.user);
    }

)
;
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/olvasottKonyvek', function (req, res, next) {
    olvasottKonyvek = req.body.olvasottKonyvek
    fs.writeFileSync("konyvek.json", JSON.stringify(olvasottKonyvek), (err) => {
        if (err) throw err;
    })

    return res.json({ok: 'ok'})
});


app.post('/dailyTracker', function (req, res, next) {
    console.log("started")
    monthlyDays = req.body.monthlyDays;
    fs.writeFile("daily.json", JSON.stringify(monthlyDays), (err) => {
        if (err) throw err;
    })
    return res.json({ok: 'ok'})

});
app.post('/checked', function (req, res, next) {
    console.log("started")
    checked = req.body.checked;
    fs.writeFile("checked.json", JSON.stringify(checked), (err) => {
        if (err) throw err;
    })
    return res.json({ok: 'ok'})

});
app.post('/calendarData', function (req, res, next) {
    console.log("started")
    calendarData = req.body.calendarData;
    fs.writeFile("calendarData.json", JSON.stringify(calendarData), (err) => {
        if (err) throw err;
    })
    return res.json({ok: 'ok'})

});

app.get('/olvasottKonyvek', function (req, res, next) {
    return res.json(olvasottKonyvek);
})


app.get('/dailyTracker', function (req, res, next) {
    return res.json(monthlyDays);
})

app.get('/checked', function (req, res, next) {
    return res.json(checked);
})
app.get('/calendarData', function (req, res, next) {
    return res.json(calendarData);
})


app.listen(8765, function () {
    console.log('CORS-enabled web server listening on port 8765')
})