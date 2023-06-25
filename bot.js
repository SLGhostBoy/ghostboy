const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(Bot está online!);
});

client.on('message', (message) => {
  if (message.content.startsWith('!userinfo')) {
    const args = message.content.split(' ');
    if (args.length !== 2) {
      message.reply('Por favor, forneça um ID de usuário válido.');
      return;
    }

    const userId = args[1];

    const user = client.users.cache.get(userId);
    if (!user) {
      message.reply('Usuário não encontrado.');
      return;
    }

    const { username, discriminator, avatarURL, bot, flags } = user;

    let nitroLevel = 'Sem Nitro';
    if (flags && flags.has('NITRO')) {
      nitroLevel = 'Nitro Clássico';
      if (flags.has('EARLY_SUPPORTER')) {
        nitroLevel = 'Nitro Clássico com Early Supporter';
      } else if (flags.has('DISCORD_EMPLOYEE')) {
        nitroLevel = 'Nitro de Funcionário do Discord';
      } else if (flags.has('DISCORD_PARTNER')) {
        nitroLevel = 'Nitro de Parceiro do Discord';
      } else if (flags.has('HYPESQUAD_EVENTS')) {
        nitroLevel = 'Nitro de Eventos do HypeSquad';
      } else if (flags.has('BUGHUNTER_LEVEL_1')) {
        nitroLevel = 'Bug Hunter Nível 1';
      } else if (flags.has('BUGHUNTER_LEVEL_2')) {
        nitroLevel = 'Bug Hunter Nível 2';
      } else if (flags.has('VERIFIED_DEVELOPER')) {
        nitroLevel = 'Desenvolvedor Verificado';
      }
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('Informações do Usuário')
      .setDescription(Nome: ${username}#${discriminator}\nID: ${userId}\nNitro: ${nitroLevel})
      .setImage(avatarURL)
      .setColor('#7289DA');

    message.channel.send(embed);
  }
});

client.login('MTEyMjMyMjE2NDQ1Mjk1NDE2Mg.GGP2UG.A4tcBvLydvlHbj5KqBqZtU7lWEvFkNFyCmSUE8');
