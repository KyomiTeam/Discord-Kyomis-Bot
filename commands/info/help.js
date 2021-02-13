const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}



function getAll(client, message) {

    message.channel.bulkDelete(1);

    const embed = new Discord.MessageEmbed()
        .setColor("#4ad5ff")
        .setTitle("Need help ?")
        .addField('Bot Infos :', '- Perfix : `' + process.env.PREFIX + '`' + '\nCreator : `Kyomi`')
        .setDescription("I'm here for you !")
        .setFooter(`${client.user.username} - Help Command`)
        .setImage('https://contenthub-static.grammarly.com/blog/wp-content/uploads/2018/05/how-to-ask-for-help.jpg')
        .setTimestamp()

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
        console.log('Bot sent help embed')
    return message.channel.send(embed.setDescription(info));
    
}

function getCMD(client, message, input) {

    message.channel.bulkDelete(1);
    
    const embed = new Discord.MessageEmbed();

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    
    console.log('Bot sent infos about "' + cmd.name + '" command')
    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}