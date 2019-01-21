const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Eğlence")
  .setDescription('')
  .setColor('RANDOM')
  .addField("** :tada: Eğlence Komutları :tada:**", 'ca!atatürk = Rastgele Atatürkün Fotoğraflarını Gösterir. \nca!starwars = StarWars (Pixel Formatında) Filmini Gösterir. \nca!banned = Dene ve Gör! \nca!kahkaha = Kahkaha Atarsınız. \nca!nah = Nah Çekersiniz :D \nca!stresçarkı = Stres Çarkı Çevirirsiniz. \nca!yaz = Bota Yazı Yazdırmanızı Sağlar \nca!tkm = Taş Kağıt Makas Oynamanıza Yarar \nca!emojiyazı = Emojiyle Yazmanızı Sağlar  \nca!herkesebendençay = Herkese Çay Alırsınız. \nca!koş = Koşarsınız.\nca!çayiç = Çay İçersiniz. \nca!çekiç = İstediğiniz Kişiye Çekiç Atarsınız. \nca!çayaşekerat = Çaya Şeker Atarsınız. \nca!yumruk-at = Yumruk Atarsınız. \nca!şanslısayım = Bot Sizin Şanslı Sayınızı Söyler. \nca!espiri = Bot Size Espiri Yapar :)\nca!aşkölçer = Belirtilen Kişiyle Sizin Aşk Derecenizi Ölçer.\nca!winner = Profil Resminize Winner Efekti Ekler. \nca!kingsman = KingsMan Fİlminden Birkaç Kare Gösterir.\nca!wasted = Profil Resminize Wasted Efekti Ekler. \nca!lafsokansözler = Bot Laf Sokan Sözler Söyler.\nca!balıktut = Balık Tutarsınız.')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
}; 

exports.help = {
  name: 'eğlence',
  description: 'Eğlence Komutlarını Gösterir',
  usage: 'eğlence [komut]'
};
