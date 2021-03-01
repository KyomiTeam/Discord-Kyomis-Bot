const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {

        message.delete()
        
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(`${client.user.username} - Meme Generator`)

        message.channel.send(embed).then(msgt => {
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
        console.log('Bot sent a meme')
    }
}