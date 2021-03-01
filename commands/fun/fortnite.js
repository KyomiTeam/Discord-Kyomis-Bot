const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

module.exports = {
    name: "fortnite",
    aliases: ["ft"],
    description: "Display someone's stats, the current store, and challenges!!",
    usage: "<username | store>",
    run: async (client, message, args) => {

        message.delete()
        message.channel.send('Please wait... This command need a few seconds...')


        const platforms = ["pc", "xbl", "psn"];
        
        if (args[0].toLowerCase() === "store") {
            const store = await ft.store();

            const embed = new Discord.MessageEmbed()
                .setColor("#9d4dbb")
                .setFooter("Fortnite store", message.author.displayAvatarURL)
                .setTimestamp();

            store.sort((a, b) => {
                return b.vbucks - a.vbucks;
            });

            store.forEach(el => {
                embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
                **- Price:** ${el.vbucks} v-bucks
                **- Image:** [Press Me](${el.image})`, true)
            });

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
            
        } else {
            const lastWord = args[args.length - 1].toLowerCase();
            
            let platform, username; 

            if (platforms.includes(lastWord)) {
                username = args.slice(0, args.length - 1).join(" "); 
                platform = lastWord;
            } else {    
                username = args.join(" ");
                platform = "pc";
            }
            
            var image = 'https://www.jvfrance.com/wp-content/uploads/2019/10/Fortnite_blog_fortnite-chapter-2-update-whats-new_11BR_Launch_News_PatchNotes_Header_v2-1920x1080-b2f19d835444e7e3923974ca9a60f13f261bc91f.jpg'
            if(platform === "xbl") image = 'https://media.comicbook.com/2019/02/xbox-logo-1159774.jpeg'
            if(platform === "psn") image = 'https://www.fredzone.org/wp-content/uploads/2018/11/SonyPSE32019.png'

            const search = await ft.user(username, platform);

            if (!search.username) {
                return message.channel.send("Couldn't find that person, try again")
                    .then(m => m.delete(5000));
            }

            const lifetime = search.stats.lifetime;
            const solo = search.stats.solo;
            const duo = search.stats.duo;
            const squad = search.stats.squad;

            const embed = new Discord.MessageEmbed()
                .setTitle(`${search.username} (${search.platform})`)
                .setURL(search.url)
                .setColor("#9d4dbb")
                .setFooter(`${client.user.username} - Fortnite Stats`, message.author.displayAvatarURL)
                .setTimestamp()
                .addField("Solo:", stripIndents`**- Wins:** ${solo.wins}
                **- KD:** ${solo.kd}
                **- Kills:** ${solo.kills}
                **- Kills per match:** ${solo.kills_per_match}`, true)
                .addField("Duo:", stripIndents`**- Wins:** ${duo.wins}
                **- KD:** ${duo.kd}
                **- Kills:** ${duo.kills}
                **- Kills per match:** ${duo.kills_per_match}`, true)
                .addField("Squad:", stripIndents`**- Wins:** ${squad.wins}
                **- KD:** ${squad.kd}
                **- Kills:** ${squad.kills}
                **- Kills per match:** ${squad.kills_per_match}`, true)
                .addField("Lifetime:", stripIndents`**- Wins:** ${lifetime.wins}
                **- KD:** ${lifetime.kd}
                **- Kills:** ${lifetime.kills}`, false)
                .setImage(image)
            message.channel.bulkDelete(1);

            console.log('Bot sent ' + username + ' fortnite infos on ' + platform + ' plateform')
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
        }
    }
}