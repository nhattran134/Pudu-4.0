/**
 * @file iAmNot command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.exec = async (Bastion, message, args) => {
  try {
    if (args.length < 1) {
      /**
      * The command was ran with invalid parameters.
      * @fires commandUsage
      */
      return Bastion.emit('commandUsage', message, this.help);
    }

    let guild = await Bastion.db.get(`SELECT selfAssignableRoles FROM guildSettings WHERE guildID=${message.guild.id}`);
    if (!guild) return;

    let role = message.guild.roles.find('name', args.join(' '));
    if (!role) return;

    let selfAssignableRoles = [];
    if (guild.selfAssignableRoles) {
      selfAssignableRoles = guild.selfAssignableRoles.split(' ');
    }
    if (!selfAssignableRoles.includes(role.id)) return;

    if (message.guild.me.highestRole.comparePositionTo(role) <= 0) return Bastion.log.info('I don\'t have permission to use this command on that role.');

    await message.member.removeRole(role);
    message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        description: `${message.author}, you have been removed from the **${role.name}** role.`
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
  aliases: [ 'idontwant', 'idonthave' ],
  enabled: true
};

exports.help = {
  name: 'iAmNot',
  botPermission: 'MANAGE_ROLES',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'iAmNot <role name>',
  example: [ 'iAmNot Looking to play' ]
};