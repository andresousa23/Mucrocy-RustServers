const Discord = require('discord.js');
const fs = require('fs')
const request = require('request')
const client = new Discord.Client();


let rawdata = fs.readFileSync('../dados.json');
const data = JSON.parse(rawdata)
const mucrocyAPI_URL = "http://localhost/api/servidor/logs"
const battleMetrics_TOKEN = data['BATTLEMETRICS_TOKEN']

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


function verifyIfExists(array1, array2){
    let rArray = new Array()
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            const element = array1[i];
            const elementt = array2[j];
            if(element == elementt){
                console.log(element);

            }
            // rArray.push(elementt)
            // if(element.textContent == elementt){
            //     rArray.pop();
            // }
            
        }
    }

    return "a";
}


client.on('message', msg => {
    if (msg.content === 'ping') {
        let array2 = new Array()
        let array3 = new Array()
        request({
            url: mucrocyAPI_URL,
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
                  // array2 = verifyIfExists(array1.Eventos, )
                  // let t = verifyifexists(array3.evento, array1.eventos);

                  console.log(bodyJson.Eventos)
              }
        
        });
    }
  });


client.login(data["DISCORD_BOT_TOKEN"]);