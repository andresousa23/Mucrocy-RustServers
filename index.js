//Packages import
//const { Webhook } = require('discord-webhook-node')
const fs = require('fs')
const request = require('request')
const express = require('express')
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express()

let rawdata = fs.readFileSync('dados.json');
let data = JSON.parse(rawdata);

//const hook = new Webhook(data['WEBHOOK_URL'])

const rustServer_URL = data['RUSTSERVER_URL']
const rustAPIServer_URL = data['RUSTAPISERVER_URL']
const battleMetrics_TOKEN = data['BATTLEMETRICS_TOKEN']

 
app.get('/', (req, res) => {
  res.send('POR FAZER')
})
app.get('/api/servidor', (req, res) => {
    res.json({
        "WORKING_URLS": [
            "/api/servidor/nome",
            "/api/servidor/ip",
            "/api/servidor/maxPlayers",
            "/api/servidor/onlinePlayers",
            "/api/servidor/logs"
        ]
    })
})

app.get('/api/servidor/nome', (req, res) => {
    request({
        url: rustAPIServer_URL,
        headers: {
            'Authorization': `Bearer ${battleMetrics_TOKEN}`
        },
        rejectUnauthorized: false
    
    }, function(err, response) {
          if(err) {
            console.error(err);
          } else {
              const body = response.body
              const bodyJson = JSON.parse(body)
              const name = bodyJson.data.attributes.name
              res.json({name})
          }
    
    });
})


app.get('/api/servidor/ip', (req, res) => {
    request({
        url: rustAPIServer_URL,
        headers: {
            'Authorization': `Bearer ${battleMetrics_TOKEN}`
        },
        rejectUnauthorized: false
    
    }, function(err, response) {
          if(err) {
            console.error(err);
          } else {
              const body = response.body
              const bodyJson = JSON.parse(body)
              const ip = bodyJson.data.attributes.ip + ":" + bodyJson.data.attributes.port
              res.json({ip})
          }
    
    });
})


app.get('/api/servidor/maxPlayers', (req, res) => {
    request({
        url: rustAPIServer_URL,
        headers: {
            'Authorization': `Bearer ${battleMetrics_TOKEN}`
        },
        rejectUnauthorized: false
    
    }, function(err, response) {
          if(err) {
            console.error(err);
          } else {
              const body = response.body
              const bodyJson = JSON.parse(body)
              const maxPlayers = bodyJson.data.attributes.maxPlayers
              res.json({maxPlayers})
          }
    
    });
})


app.get('/api/servidor/onlinePlayers', (req, res) => {
    request({
        url: rustAPIServer_URL,
        headers: {
            'Authorization': `Bearer ${battleMetrics_TOKEN}`
        },
        rejectUnauthorized: false
    
    }, function(err, response) {
          if(err) {
            console.error(err);
          } else {
              const body = response.body
              const bodyJson = JSON.parse(body)
              const players = bodyJson.data.attributes.players
              res.json({players})
          }
    
    });
})


app.get('/api/servidor/logs', (req, res) => {

    got(rustServer_URL).then(response => {
        const dom = new JSDOM(response.body);
        const t = dom.window.document.querySelectorAll('.css-zwebxb')
        const b = dom.window.document.querySelectorAll('.event-msg')
        let players = new Array()
        let eventos = new Array()
        t.forEach(element => {
            players.push(element.textContent)
        });

        b.forEach(element => {
            eventos.push(element.textContent)
            if(element.textContent == "Server responded to query"){
                eventos.pop()
            }
        });

        res.json({
            "Players":  players,
            "Eventos":  eventos,
        })


      }).catch(err => {
        console.log(err);
      });
})
 
app.listen(3000, () => {console.log("Listening in: http://localhost:3000/");})