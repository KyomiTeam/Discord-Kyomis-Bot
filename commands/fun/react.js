const Discord = require("discord.js");

module.exports = {
    name: "react",
    category: "fun",
    description: "Sends a reaction",
    run: async (client, message, args) => {
        message.react('🗑️');

    const filter = (reaction, user) => {
	    return ['🗑️'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
	    .then(collected => {
		    const reaction = collected.first();

		    if (reaction.emoji.name === '🗑️') {
				console.log('Message deleted !')
			    return message.delete();
		    }
	    })
	    .catch(collected => {
			console.log('Message deleted !')
		    return message.delete();
	    });
        }
}