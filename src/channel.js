/*
I am going to do the command on a bot that in case it does not have an nsfw channel indicated will not send nsfw content on any channel.
*/
//________________________________________PREFIX________________________________
let prefix = "tu-prefix" 
//______________________________________________SET UP CHANNEL_____________________________________________
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "set nsfw")) {
const db = require('megadb'); 
let nsfw = new db.crearDB('nsfw'); 
        var id = message.author.id

      if (message.guild == null) return;
      
    
        let perms = message.member.hasPermission("ADMINISTRATOR")
        if(!perms) return message.channel.send("Para realizar esta acción necesitas tener el siguiente permiso: `Administrador`")
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send ("__¡You must mention a channel!__")
        if (channel.nsfw){
            message.channel.send("This channel is NSFW.");
        
  
        
        if(nsfw.has(message.guild.id)){
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send ("__¡You must mention a channel!__")
          nsfw.eliminar(message.guild.id, channel.id);
          nsfw.establecer(message.guild.id, channel.id);
        }
        nsfw.establecer(message.guild.id, channel.id);
        const embed = new Discord.MessageEmbed()
            .setDescription("<#" + channel.id + "> It is now the NSFW channel.")
            .setColor("Red")
        message.channel.send(embed)
        } else {
           const embed = new Discord.MessageEmbed()
           .setTitle("No se ha podido establecer")
            .setDescription("<#" + channel.id + "> is NOT an nsfw channel.")
            .setImage("https://i.ibb.co/pbqfNpt/Captura.png")
            .setColor("Red")
        message.channel.send(embed)
  }
 }});
//___________________________________SEND MESSAGE_____________________________________
client.on('message', async message => {
  if(message.content.toLowerCase().startsWith(prefix + "test nsfw")) {
const db = require('megadb'); 
let nsfw = new db.crearDB('nsfw'); 

 var id = message.channel.id;
 var ide = message.guild.id;

      if (message.guild == null) return;

        if(nsfw.tiene(message.guild.id)){
          const canal = await nsfw.obtener(message.guild.id)

        client.channels.cache.get(canal).send("This is the nsfw channel");
        }else{
          message.channel.send ("This server does not have an NSFW channel, if you want to use this command set a channel with the command `set nsfw`.")
        }
 }});
