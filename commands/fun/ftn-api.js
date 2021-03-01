const FortniteAPI = require("fortnite-api-com");
const Discord = require("discord.js");

module.exports = {
    name: "ftn-api",
    aliases: ["api"],
    //category: "fun",
    description: "Fortnite API",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        
        message.delete();
        
        const config = {
            apikey: "67ba1acfb49be607b053ff06173b7595912c91aedb9c59418713823fe335fba4",
            language: "fr",
            debug: true
        };

        var Fortnite = new FortniteAPI(config);
       

        if(args[0].toLowerCase() === "map"){
            Fortnite.BRMap("fr")
            .then(res => {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Fortnite Map')
                    .setDescription('This fortnite shop command is in beta. Sorry for any bug and any missings.')
                    .setColor('#00b0e6')
                    .setImage(res.data.images.blank)
                    .setFooter(`${client.user.username} - Fortnite Map`)
                console.log(res);
                return message.channel.send(embed)

            }).catch(err => {
                return console.log(err);
            });
        }

        if(args[0].toLowerCase() === "shop"){
            Fortnite.BRShop("fr")
            .then(res => {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Fortnite Shop')
                    .setDescription('This fortnite shop command is in beta. Sorry for any bug and any missings.')

                    /*
                    .addField(`${res.data.featured.name}`, `**- ${res.data.featured.entries[0].items[0].name} (${res.data.featured.entries[0].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[0].items[0].description}
                            \n**- ${res.data.featured.entries[0].items[1].name} (${res.data.featured.entries[0].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[0].items[1].description}
                            \n**- ${res.data.featured.entries[1].items[0].name} (${res.data.featured.entries[1].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[1].items[0].description}
                            \n**- ${res.data.featured.entries[1].items[1].name} (${res.data.featured.entries[1].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[1].items[1].description}
                            \n`, false)
                    */

                    .addFields(
                        { name : `${res.data.daily.name}`, value : `**- ${res.data.daily.entries[0].items[0].name} (${res.data.daily.entries[0].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[0].items[0].description}
                        \n**- ${res.data.daily.entries[0].items[1].name} (${res.data.daily.entries[0].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[0].items[1].description}
                        \n**- ${res.data.daily.entries[1].items[0].name} (${res.data.daily.entries[1].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[1].items[0].description}
                        \n` },

                        { name : '-----------------------------------------------', value : '\u200b' },

                        { name : `${res.data.featured.name}`, value : `**- ${res.data.featured.entries[0].items[0].name} (${res.data.featured.entries[0].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[0].items[0].description}
                        \n**- ${res.data.featured.entries[0].items[1].name} (${res.data.featured.entries[0].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[0].items[1].description}
                        \n**- ${res.data.featured.entries[1].items[0].name} (${res.data.featured.entries[1].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[1].items[0].description}
                        \n**- ${res.data.featured.entries[1].items[1].name} (${res.data.featured.entries[1].finalPrice} V-bucks) :**\n       ${res.data.featured.entries[1].items[1].description}
                        \n` }
                    )
                    /*
                    .addField(`${res.data.daily.name}`, `**- ${res.data.daily.entries[0].items[0].name} (${res.data.daily.entries[0].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[0].items[0].description}
                            \n**- ${res.data.daily.entries[0].items[1].name} (${res.data.daily.entries[0].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[0].items[1].description}
                            \n**- ${res.data.daily.entries[1].items[0].name} (${res.data.daily.entries[1].finalPrice} V-bucks) :**\n       ${res.data.daily.entries[1].items[0].description}
                            \n`, false)
                    */
                    .setImage(res.data.featured.entries[0].items[0].images.featured)
                    .setColor('#7b32a8')
                    .setFooter(`${client.user.username} - Fortnite Shop - ${res.data.date}`)


                console.log(res);

                return message.channel.send(embed).then(msgt => {
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
            }).catch(err => {
                console.log(err);
            });
        }
        
        if(args[0].toLowerCase() === "creator"){
            Fortnite.CreatorCode(args[1].toLowerCase())
            .then(res => {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Fortnite Creator')
                    .addField('Status', res.status)
                console.log(res);
                return message.channel.send(embed)
            }).catch(err => {
                console.log(err);
            });
        }
        


        /*
        Fortnite.Parameters()
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.AES()
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        

        

        Fortnite.Playlists("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.PlaylistsID("Playlist_DefaultSolo", "en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        

        Fortnite.BannersColors()
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.BRStats({name: "TFue", accountType: "epic", timeWindow:"lifetime", image: "none"})
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });


        Fortnite.BRStatsID("b9afb91df9964891bd49bfe200ae35c7", {accountType: "epic", timeWindow:"lifetime", image: "none"})
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });


        Fortnite.BRShop("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.BRShopCombined("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CreatorCode("TFue")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CreatorCodeSearch("TFue")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CreatorCodeSearchAll("TFue")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CosmeticsNew("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CosmeticsList("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        }

        Fortnite.CosmeticsSearch({name: "John", matchMethod: "contains", language: "en"})
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CosmeticsSearchAll({name: "Gui", matchMethod: "contains", language: "en"})
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CosmeticsSearchByID("CID_416_Athena_Commando_M_AssassinSuit", "en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.CosmeticsSearchByIDs(["CID_416_Athena_Commando_M_AssassinSuit", "CID_398_Athena_Commando_M_TreasureHunterFashion"], "en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.News("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.NewsBR("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.NewsSTW("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        Fortnite.NewsCreative("en")
        .then(res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        });

        */
    }
}