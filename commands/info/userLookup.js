/**
 * @file userLookup command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.id) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let user = await Bastion.fetchUser(args.id);

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: `${user.bot ? 'Bot' : 'User'} Lookup`,
      fields: [
        {
          name: 'Username',
          value: user.username,
          inline: true
        },
        {
          name: 'Discriminator',
          value: user.discriminator,
          inline: true
        },
        {
          name: 'ID',
          value: user.id,
          inline: true
        }
      ],
      thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}`
      }
    }
  });
};

exports.config = {
  aliases: [ 'uLookup' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'userLookup',
  description: 'Fetches basic information of a user from Discord.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'userLookup <USER_ID>',
  example: [ 'userLookup 167122669385743141' ]
};
