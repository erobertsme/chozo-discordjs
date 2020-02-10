import chalk from 'chalk'

const now = new Date(Date.now()).toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit', second: '2-digit' });

const consoleLogger = (client, settings, message) => {
  // if message from bot
  if (message.author === client.user) {
    if (message.guild) {
      console.log(`[${now}] [${chalk.yellow(message.guild)}] <${chalk.blue(message.channel.name)}> ${chalk.green(client.user.tag)}: ${message.content}`);
    } else {
      console.log(`[${now}] [${chalk.yellow('DM')}] <${chalk.green(client.user.tag)} to ${chalk.magenta(message.channel.recipient.tag)}>: ${message.content}`);
    }
    return
  }

  // if message content not empty
  if (message.content !== '') {
    if (message.guild) {
      console.log(`[${now}] [${chalk.yellow(message.guild.name)}] <${chalk.blue(message.channel.name)}> ${chalk.magenta(message.author.tag)}: ${message.content}`);
    } else if (message.channel.type === 'dm') {
      console.log(`[${now}] [${chalk.yellow('DM')}] <${chalk.magenta(message.author.tag)} to ${chalk.green(client.user.tag)}>: ${message.content}`);
      if (message.author.tag !== settings.owner) {
        client.users.find(user => user.tag === settings.owner).send(`<${message.author.id}> ${message.author.username}: ${message.content}`);
      }
    }
  } else { // if empty, the message must have an attachment?
    console.log(`[${now}] [${chalk.yellow(message.guild.name)}] <${chalk.blue(message.channel.name)}> ${chalk.magenta(message.author.tag)}: [Attachment]`)
  }
}

export default consoleLogger