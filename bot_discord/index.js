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

client.on('message', msg => {
    let eventos = new Array()
    let array = new Array()
    if (msg.content === 'quero logs') {
        msg.channel.send("Ok babe, estou a mandar logs", {files:["../fotos/IMG_1443.PNG"]})


        var timeout = setTimeout(() => {

            request({
                url: mucrocyAPI_URL,
                rejectUnauthorized: false
            }, (err, res1) => {
                if(err){
                    console.error(err);
                } else {

                    const body = res1.body

                    const bodyJSON = JSON.parse(body)

                    eventos = bodyJSON.Eventos

                    setTimeout(() => {
                        request({
                            url: mucrocyAPI_URL,
                            rejectUnauthorized: false
                        }, (err, res2) => {
                            if(err){
                                console.error(err);
                            } else {
                                //Pegar no body
                                const body = res2.body
                                //Converter a resposta para um json para melhor uso
                                const bodyJSON = JSON.parse(body)
                                //Pegar nos eventos
                                array = bodyJSON.Eventos
                                for (let i = 0; i < array.length; i++) {
                                    if(array[i] !== eventos[i]){
                                        msg.channel.send(`**${new Date().toLocaleString()} (DATA NAO É CERTA MAS PODEM TIRAR UNS SEGUNDITOS)** - ${array[i]}`)
                                        array.shift()
                                        i--
                                    }
                                }
                                timeout.refresh()
                            }
                        })
                    }, 10 * 1000);

                }
            })
        }, 1 * 1000)

        
    }
  });


client.login(data["DISCORD_BOT_TOKEN"]);
