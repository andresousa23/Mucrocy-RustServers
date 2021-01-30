const Discord = require('discord.js');
const fs = require('fs')
const request = require('request')
const client = new Discord.Client();


let rawdata = fs.readFileSync('../dados.json');
const data = JSON.parse(rawdata)
const mucrocyAPI_URL = "http://85.234.128.69/api/servidor/logs"

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


function verifyIfEquals(array1, array2){
    if(array1.length != array2.length) return false

    for (var i = 0; array1.length < i; i++){
        if (array1[i] != array2[i]) return false;
    }
    
    return true
}

client.on('message', msg => {
    let eventos = new Array()
    let array = new Array()
    if (msg.content === 'quero logs') {
        msg.channel.send("Ok babe, estou a mandar logs", {files:["../fotos/IMG_1443.PNG"]})
        setTimeout(() => {msg.channel.send("OOPS MANDEI A COISA ERRADA")}, 3000)
        setTimeout(() => {msg.channel.send("A enviar.....")}, 3000)
        setInterval(() => {
            request({
                url: mucrocyAPI_URL,
                rejectUnauthorized: false
            
            }, function(err, response) {
                if(err) {
                    console.error(err);
                } else {
                    const body = response.body
                    const bodyJson = JSON.parse(body)
                    eventos = bodyJson.Eventos
                    setTimeout(() =>{
                        request({
                            url: mucrocyAPI_URL,
                            rejectUnauthorized: false
                        
                        }, function(err, response) {
                            if(err) {
                                console.error(err);
                            } else {
                                array = JSON.parse(response.body).Eventos
                                msg.channel.send("\u200B")
                                if(verifyIfEquals(eventos, array)){
                                    for(let i = 0; i < array.length-1; i++){
                                        msg.channel.send(array[i])
                                    }
                                }
                            }
                        
                        });
                    }, 5000)
                }
            
            });
        }, 10000)
        
    }
  });


client.login(data["DISCORD_BOT_TOKEN"]);
