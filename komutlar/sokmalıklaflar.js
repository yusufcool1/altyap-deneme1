const Discord = require('discord.js');
exports.run = function(client, message, args) {
    let replies = ["Yalanım yok ki benim aklımdasın hala. Ne yapayım güzelim gereksiz şeyleri hep kafama takıyorum", " Kimine göre kral kimine göre yalanım... Unutmayın beyler adamına göre adamım...", "Canımı yakacak kadar güçlü olanın sonuçlarına katlanacak kadar gücü olmalı.", "İnsanlığa davet etsek yol tarifi isteyecek insanlar var.","Laf sokma, kapak olursun. Yalvarma, köpek olursun. Delikanlı ol, belki yanımda yer bulursun." ,"Karakterin Otururken Sandalyesini Çekmişler Galiba"];
      let result = Math.floor((Math.random() * replies.length))

      const ball = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('RANDOM')
      .setDescription(replies[result]);
      message.channel.sendEmbed(ball)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['lafsokansözler'],
  permLevel: 0
};

exports.help = {
  name: 'laf-sokan-sözler',
  description: 'Laf-sokan-Sözler.',
  usage: 'laf-sokan-sözler'
};