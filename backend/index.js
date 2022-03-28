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
app.use(cors({
    credentials: true, origin: ['http://localhost:3000'],exposedHeaders: ["set-cookie"]
}));
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


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const APIKEY = '6beefb0371b61e59b835542c6fbec081';

let olvasottKonyvek = require('./konyvek.json');
let monthlyDays = require('./daily.json');
let calendarData = require('./calendarData.json')
let checked = require('./checked.json')


app.post(
    '/login',
    LokiLocal.use('login', {mode: 'debug'}),
    (req, res, next) =>
        res.json(req.user)
)
;

app.post(
    '/signup',
    LokiLocal.use('signup', {mode: 'debug'}),
    (req, res, next) => 
          res.json(req.user)
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