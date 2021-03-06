/**
 * @file greetTimeout command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.exec = async (Bastion, message, args) => {
  try {
    if (!/^(([0-2]?[0-9]?[0-9])|300)$/.test(args[0])) {
      args[0] = '0';
    }
    await Bastion.db.run(`UPDATE guildSettings SET greetTimeout=${args[0]} WHERE guildID=${message.guild.id}`);

    message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        title: 'Greet Timeout set to:',
        description: args[0] > 60 ? `${args[0] / 60} min.` : args[0] === 0 ? '∞' : `${args[0]} sec.`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'gtout' ],
  enabled: true
};

exports.help = {
  name: 'greetTimeout',
  botPermission: '',
  userTextPermission: 'ADMINISTRATOR',
  userVoicePermission: '',
  usage: 'greetTimeout [time_in_seconds]',
  example: [ 'greetTimeout 120', 'greetTimeout' ]
};
