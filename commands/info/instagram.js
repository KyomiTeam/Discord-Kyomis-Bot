const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "info",
    description: "Find out some nice instagram statistics",
    usage: "<name>",
    run: async (client, message, args) => {

        message.delete()

        const name = args.join(" ");

        if (!name) {
            message.reply("Maybe it's useful to actually search for someone...!")
            setTimeout(()=> message.channel.bulkDelete(1), 3000);
            return
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        
        let res; 

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("I couldn't find that account... :(")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new Discord.MessageEmbed()
            .setColor("#de3170")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`)
            .setFooter(`${client.user.username} - Instagram Search`);

        console.log('Bot sent ' + account.username + ' instagram infos')
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
        });
    }
}