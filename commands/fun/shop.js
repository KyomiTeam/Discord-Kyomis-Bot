module.exports = {
    name: "shop",
    aliases: ["s"],
    //category: "fun",
    description: "Fortnite Shop",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        const Canvas = require("discord-canvas"),
        Discord = require("discord.js");
        
        const image = await new Canvas.Goodbye()
        .setUsername("xixi52")
        .setDiscriminator("0001")
        .setMemberCount("140")
        .setGuildName("Server DEV")
        .setAvatar("https://www.site.com/avatar.jpg")
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground("https://site.com/background.jpg")
        .toAttachment();
        
        const attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
        
        message.channel.send(attachment);
    }
}


