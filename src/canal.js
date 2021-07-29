/*
Yo voy a hacer el comando sobre un bot que en caso de que no tenga un canal nsfw indicado no mandará contenido nsfw en ningún canal.
*/
//________________________________________PREFIX________________________________
let prefix = "tu-prefix" 
//______________________________________________ESTABLECER CANAL_____________________________________________
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "set nsfw")) {
const db = require('megadb'); 
let nsfw = new db.crearDB('nsfw'); 
        var id = message.author.id

      if (message.guild == null) return;
      
    
        let perms = message.member.hasPermission("ADMINISTRATOR")
        if(!perms) return message.channel.send("Para realizar esta acción necesitas tener el siguiente permiso: `Administrador`")
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send ("__¡Debes mencionar un canal!__")
        if (channel.nsfw){
            message.channel.send("This channel is NSFW.");
        
  
        
        if(nsfw.has(message.guild.id)){
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send ("__¡Debes mencionar un canal!__")
          nsfw.eliminar(message.guild.id, channel.id);
          nsfw.establecer(message.guild.id, channel.id);
        }
        nsfw.establecer(message.guild.id, channel.id);
        const embed = new Discord.MessageEmbed()
            .setDescription("<#" + channel.id + "> Es ahora el canal NSFW.")
            .setColor("Red")
        message.channel.send(embed)
        } else {
           const embed = new Discord.MessageEmbed()
           .setTitle("No se ha podido establecer")
            .setDescription("<#" + channel.id + "> NO es un canal nsfw.")
            .setImage("https://i.ibb.co/pbqfNpt/Captura.png")
            .setColor("Red")
        message.channel.send(embed)
  }
 }});
//___________________________________MANDAR MENSAJE_____________________________________
client.on('message', async message => {
  if(message.content.toLowerCase().startsWith(prefix + "test nsfw")) {
const db = require('megadb'); 
let nsfw = new db.crearDB('nsfw'); 

 var id = message.channel.id;
 var ide = message.guild.id;

      if (message.guild == null) return;

        if(nsfw.tiene(message.guild.id)){
          const canal = await nsfw.obtener(message.guild.id)

        client.channels.cache.get(canal).send("Este es el canal nsfw");
        }else{
          message.channel.send ("Este servidor no tiene un canal NSFW, Si quieres usar este comando establece un canal con el comando `set nsfw`")
        }
 }});
