const Discord = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        

        if (args[0].toLowerCase() === "embed") {
            const embed = new Discord.MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor("#f5f5f5");

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}