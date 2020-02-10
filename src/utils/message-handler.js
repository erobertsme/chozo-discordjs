import consoleLogMessages from './console'

const MessageHandler = {
  parseMessage: (client, settings, message) => {

    // Log messages to console
    consoleLogMessages(client, settings, message);

    // Assign variables for use in commands
    const messageFirstCharacter = message.content.charAt(0);
    const messageContent = message.content.substr(message.content.indexOf(' ')+1);
    const [command, ...args] = message.content.slice(1).split(' ');

    // if not a bot command
    if (messageFirstCharacter !== settings.prefix) {
      return
    }

    switch (command.toLowerCase()) {
      case 'ping':
        message.channel.send('Pong!');
        return

      case 'say':
        if (client.channels.find(channel => channel.id === args[0])) {
          client.channels.find(channel => channel.id === args[0]).send(messageContent.replace(args[0], ''))
        } else {
          message.channel.send(messageContent);
        }
        return

      case 'msg':
        if (client.users.find(user => user.tag === args[0])) {
          client.users.find(user => user.tag === args[0]).send(messageContent.replace(args[0], ''))
        } else if (client.users.find(user => user.id === args[0])) {
          client.users.find(user => user.id === args[0]).send(messageContent.replace(args[0], ''))
        } else {
          message.channel.send(`Sorry <@${message.author.id}>, I couldn't find that user.`)
        }
        return

      case 'channels':
        message.channel.send(message.guild.channels.reduce((list, channel) => list + '\n ' + channel.name));
        console.log(message.guild.channels.reduce((list, channel) => list + '\n' + channel.name));
        return

      case 'debug':
        switch (args[0]) {
          case '':
            return
          case 'message':
            console.log(message);
            return
          case 'channels':
            console.log(message.guild.channels);
            return
          case 'client':
            console.log(client);
            return
          case 'guild':
            console.log(message.guild);
            return
          case 'member':
            console.log(message.member);
            return
          case 'author':
            console.log(message.author);
            return
          case 'self':
            console.log(client.user);
            return
          case 'console':
            MessageHandler.startDebugger();
            return
          default:
            console.log('\nmessageContent: ', messageContent);
            console.log(`prefix: ${messageFirstCharacter}, command: ${command}`);
            console.log("args: ", args);
            return
        }
    }
  },

  startDebugger: () => {
    debugger;
  }
}
export default MessageHandler;