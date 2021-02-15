const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
//const mongoose = require('mongoose');


console.log(`Starting...`);

const client = new Client({
    disableEveryone: true
});

// Database Connecting
//mongoose.connect('mongodb://localhost/Reports');
//const Report = require = ('./database/report.js');

// Commands Loading
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Dashboard Initializing
require('./dashboard/server');


// Bot Started
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    console.log('-----------------------------');

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "STREAMING"
        }
    }); 

    //require('./modules/dashboard')(this.client);    //

    const statuses = [
        () => `${client.guilds.cache.size} server(s)`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} user(s)`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: "PLAYING"})
        i = ++i % statuses.length
    }, 1e4)

});


client.on("message", async message => {
    const prefix = process.env.PREFIX;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (message.content.startsWith(prefix), !message.content.endsWith(prefix)){
        console.log(`${message.author.username} (${message.author.id}) sent command : "${message.content}"`)
    }
    

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        command.run(client, message, args);
    } else if (message.content.startsWith(prefix), !message.content.endsWith(prefix)){
        message.channel.bulkDelete(1);
        const embed = new Discord.MessageEmbed()
            .setTitle("! ERROR !")
            .setColor('#ff0000')
            .setImage('https://supermarketeur.com/wp-content/uploads/2020/08/http-error-500.png')
            .setDescription("This command doesn't exist !")
            .addField('Error Code :', '0x0001')
            .setFooter(`${client.user.username} - ERROR`)
        message.channel.send(embed);
        console.log('No command existing (0x0001)')
    }
});

client.login(process.env.TOKEN);