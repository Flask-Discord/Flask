const Discord = require('discord.js');
const packageJSON = require("../../package.json");
const infofile = require("../../config/info.json");
const fs = require('fs');

module.exports = {
    name: "ping",
    description: "Sends the bots ping",
    execute(message, client) {
        message.channel.send('**The Ping-inator!**\nPinging...').then((msg) => {
            ping = msg.createdTimestamp - message.createdTimestamp;
            api = Math.round(client.ws.ping)

            fs.writeFileSync("ping.pong", `${ping + api}`, 'utf-8')

            discordJSVersion = packageJSON.dependencies["discord.js"];
            const pingembed = new Discord.MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`🏓 Pong!`)
                .addFields(
                    { name: `** Total Ping ** `, value: `${ping + api}ms`, inline: true },
                    { name: '**Latency**', value: `${ping}ms`, inline: true },
                    { name: `** API ** `, value: `${api}ms`, inline: true },
                    { name: `** Discord.js Version ** `, value: `${discordJSVersion}`, inline: true },
                )
                .setFooter(`Flask Version ${infofile.Version}`)
                .setTimestamp();
            message.channel.send({
                embeds: [pingembed]
            });
            msg.delete();
        });
    }
}