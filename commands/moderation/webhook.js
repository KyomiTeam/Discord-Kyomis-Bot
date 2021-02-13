//https://discord.com/api/webhooks/810249791673991210/_FO58pGp9ijDwQytT9qIWrfTpcx3gJB-5dbD0cWCOCgm6BOdftL-cjW5UfSDb4nSmx61
const {WebhookClient, MessageEmbed} = require('discord.js');

module.exports = {
    name: "webhook",
    aliases: ["web", "hook"],
    category: "moderation",
    description: "Wabhook(s)",
    run: async (client, message, args) => {

        const wc = new WebhookClient("810249791673991210","_FO58pGp9ijDwQytT9qIWrfTpcx3gJB-5dbD0cWCOCgm6BOdftL-cjW5UfSDb4nSmx61");
            const embed = new MessageEmbed()
                .setTitle('Message from '+ message.author.tag).setColor('GREEN').setTimestamp().setFooter(`${client.user.username} - WebHook`)
                .setDescription(args.join(' '))

        wc.send({
            username : message.author.tag,
            avatartURL : message.author.displayAvatarURL({ dynamic : true}),
            embeds : [embed]
        })

    }
}