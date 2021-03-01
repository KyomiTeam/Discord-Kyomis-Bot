const webhook = require("webhook-discord");
const Hook = new webhook.Webhook("https://discord.com/api/webhooks/810249791673991210/_FO58pGp9ijDwQytT9qIWrfTpcx3gJB-5dbD0cWCOCgm6BOdftL-cjW5UfSDb4nSmx61");


module.exports = {
    name: "disconnect",
    aliases: ["deco"],
    category: "",
    description: "Stop bot",
    run: async (client, message, args) => {

        if(message.author.id = "351017714954797059"){
            message.delete();
            const msgDel = new webhook.MessageBuilder()
                .setName(`[STATUS] ${client.user.username}`)
                .setTitle(`${client.user.username} is disconected !`)
                //.setURL('http://localhost:3000/')
                .setColor("#eb4034")
                .setFooter(`Status - ${client.user.username}`)
                .setText("-----------------------------\nStatus Update :\n\n||@here||");
            return Hook.send(msgDel).then(() => {
                client.destroy();
                console.log('-----------------------------');
                console.log('Status Update : Bot disconnected !');
                console.log('-----------------------------');
            })
            
        } else {
            console.log('Order rejected !')
                return message.reply('You are not Kyomi !').then(msgt => {
                    msgt.react('🗑️');
                    const filter = (reaction, user) => {
                        return ['🗑️'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };
                    msgt.awaitReactions(filter, { max: 1, errors: ['time'] }).then(collected => {
                            const reaction = collected.first();
                            if (reaction.emoji.name === '🗑️') {
                                return msgt.delete();
                            }}).catch(collected => {
                                return msgt.delete();
                            });
                })
        }
    }
}