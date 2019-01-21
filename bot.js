const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

let küfürEngel = JSON.parse(fs.readFileSync("Jsonlar/küfürEngelle.json", "utf8"));
let linkEngel = JSON.parse(fs.readFileSync("Jsonlar/linkEngelle.json", "utf8"));

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };

client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `Kendinize Göre Ayarlayın`,
            type: 'PLAYING',
            // Değerler:
            // PLAYING: Oynuyor
            // WATCHING: İzliyor
            // LISTENING: Dinliyor                           
        },
        status: 'dnd'                                                       
        // Değerler:                                                         
        // online: Çevrimiçi
        // dnd: Rahatsız Etmeyin                
        // idle: Boşta 
    })
})



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
///////////////////////////////////////////
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.sendMessage('Aleyküm Selam , Hoşgeldin.');
  }
});
////////////////////////////////////7
client.on('guildCreate', guild => {
    let channel = client.channels.get("kendi oda id niz")//botun girdiyi sunucuyu kanala gönderelim
    const embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Giriş ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu ", guild.owner.user.tag)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
    channel.send(embed);
});
client.on('guildDelete', guild => {
    let channel = client.channels.get("kendi oda idniz")//botun çıktıgı sunucuyu kanala gönderelim

    const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(`Çıkış ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
    channel.send(embed);
});

///////////////////////////////////

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  if(sayac[message.guild.id]) {
      if(sayac[message.guild.id].sayi <= message.guild.members.size) {
          const embed = new Discord.RichEmbed()
              .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
              .setColor("RANDOM")
              .setTimestamp()
          message.channel.send({embed})
          delete sayac[message.guild.id].sayi;
          delete sayac[message.guild.id];
          fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
              console.log(err)
          })
      }
  }
})

client.on("guildMemberAdd", async (member) => {
    let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
    let role = autorole[member.guild.id].sayi

    member.addRole(role)

});

client.on("guildMemberAdd", async member => {
      let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
let embed = new Discord.RichEmbed()
  .setTitle('')
  .setDescription(``)
.setColor("RED")
  .setFooter("", client.user.avatarURL);

if (!giriscikis[member.guild.id].kanal) {
  return;
}

try {
  let giriscikiskanalID = giriscikis[member.guild.id].kanal;
  let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
  giriscikiskanali.send(`:inbox_tray: **${member.user.tag}** Adlı Kullanıcı Katıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!`);
} catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
  return console.log(e)
}
});

client.on("guildMemberRemove", async member => {
      let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
let embed = new Discord.RichEmbed()
  .setTitle('')
  .setDescription(``)
.setColor("RED")
  .setFooter("", client.user.avatarURL);

if (!giriscikis[member.guild.id].kanal) {
  return;
}

try {
  let giriscikiskanalID = giriscikis[member.guild.id].kanal;
  let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
  giriscikiskanali.send(`:outbox_tray: **${member.user.tag}** Adlı Kullanıcı Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz! `)
} catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
  return console.log(e)
}

});

//////////////////////////////////////////////////////////

client.on("message", msg => {
  if (!msg.guild) return;
  if (!küfürEngel[msg.guild.id]) return;
  if (küfürEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (küfürEngel[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
        if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Bu sunucuda küfürler **Cool Blocker** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!").then(message => message.delete(3000));
    }
}
    }
});


client.on("message", msg => { 
if (!linkEngel[msg.guild.id]) return;
if (linkEngel[msg.guild.id].linkEngel === "kapali") return;
    if (linkEngel[msg.guild.id].linkEngel === "acik") {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(msg.content)== true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Link Engeli!")
        .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
});


client.login(ayarlar.token)