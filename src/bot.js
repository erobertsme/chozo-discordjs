import Discord from 'discord.js';
import chalk from 'chalk';
import MessageHandler from './utils/message-handler';
const client = new Discord.Client();

import settings from './bot-settings'

client.on('ready', () => {
    // Startup message
    console.log(
        `\n${new Date(client.readyAt).toLocaleString('en-US',{ weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'})}
        Connected as: ${chalk.green(client.user.tag)}
        
        Owner: ${chalk.magenta(settings.owner)}
        
        Servers: 
            ${chalk.blue(client.guilds.reduce((list, guild) => list + '\n            ' + guild.name))}\n`
    );
    //console.log(client)
});

client.on('message', msg => {
    MessageHandler.parseMessage(client, settings, msg);
});

client.login(settings.token);