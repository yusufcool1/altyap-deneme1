const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription('')
  .setImage(`https://cdn.discordapp.com/attachments/535323173445566474/535941460525056010/notechtriggered.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'trigger',
  description: 'Nah Çekersiniz.',
  usage: 'nah'
};
