
    message => {
	message.react('🗑️');

    const filter = (reaction, user) => {
	    return ['🗑️'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
	    .then(collected => {
		    const reaction = collected.first();

		    if (reaction.emoji.name === '🗑️') {
			    return message.delete();
		    }
	    })
	    .catch(collected => {
		    return message.delete();
	    });
	}
	
        