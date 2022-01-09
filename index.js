
// const mySecret = process.env['TOKEN']
require('dotenv').config();
const { Command } = require('discord-akairo');
const GrandMotherCrow = require('./core/client.js');
const client = new GrandMotherCrow();
const keepAlive = require("./server");
const mongoose = require("mongoose")



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((m) => {
    console.log("Connected to MongoDB Successfully")
}).catch((err) => {
    console.log(console.log(err));
});


const prefix = "!"


keepAlive();

client.login(process.env.TOKEN);


client.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "text");

    channels.first().send("Yo thanks for adding me. I'm Landlords Bot").catch(e => console.log(e));
});

client.on("message", message => {
    if(message.content.startsWith(prefix + "report")){
        message.channel.send('Please contact the mods');

    } else if (message.content.startsWith(prefix + "avatar")) {
        message.reply(message.author.displayAvatarURL);

    }
});
