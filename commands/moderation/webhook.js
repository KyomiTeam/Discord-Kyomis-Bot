//https://discord.com/api/webhooks/813059326594908231/ZmQqoB49o_B7ic4F-vpqyKgONS3O2PZHndJrL4Q-FV3ubZN-rRUXyGWS8UvZHJFNsK_R
const {WebhookClient, MessageEmbed} = require('discord.js');

module.exports = {
    name: "contact",
    aliases: ["call", "admin"],
    category: "moderation",
    description: "Contact admin",
    run: async (client, message, args) => {
        message.delete();
        message.reply('**Your question have been sent. You gonna be contact by an admin.**\nYour question is :\n`'+args.join(' ')+'`').then(msgt => {
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


        const wc = new WebhookClient("813059326594908231","ZmQqoB49o_B7ic4F-vpqyKgONS3O2PZHndJrL4Q-FV3ubZN-rRUXyGWS8UvZHJFNsK_R");
        const user = message.author
        const pfp = user.avatar_url
            const embed = new MessageEmbed()
                .setTitle('Message from '+ message.author.tag + ` (${message.author.id})`).setColor('GREEN').setTimestamp().setFooter(`${client.user.username} - Help Contact`)
                .setDescription(args.join(' ')).setImage(pfp)

        wc.send({
            username : message.author.tag,
            avatartURL : message.author.displayAvatarURL({ dynamic : true}),
            embeds : [embed]
        }).then(() => {
            console.log(`${message.author.tag} request help of admin : ${args.join(' ')}      (Server: ${client.user.username})`)
        })
        
        

    }
}