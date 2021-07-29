//_____PREFIX______
let prefix = "tu-prefix"
//______AÑADIR_______
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "add vip")) {
const db = require('megadb'); 
let vip = new db.crearDB('vip'); //Aquí accedemos y creeamos en caso de no exixtir una db llamada "vip"
    let supervip = new db.crearDB("supervip") //Creamos una db por encíma de vip para que los vip no se puedan auto eliminar o eliminar a otros
        var id = message.author.id//Declaramos que "id" es la id del aútor del mensaje

      if (message.guild == null) return; //Revisamos que el canal no sea dm. en caso de que lo sea no hará nada
      
    
      if(supervip.tiene(id)){//Aquí revisamos que el aútor del mensaje este en la db de supervip
        let user = message.mentions.members.first();
        if(!user) return message.channel.send ("__¡Debes mencionar a un usuario!__")
        if(vip.has(user.id))return message.channel.send("__**Este usuario ya esta registrado.**__")//Aquí miramos si el usuario mencionado SI está en la db de "vip"
        vip.establecer(user.id, user.user.tag);
        const embed = new Discord.MessageEmbed()
            .setDescription("__"+user.user.tag+"__ **ha sido añadido a los usuarios VIP.**")
            .setColor("Red")
        message.channel.send(embed)
  }else{
    message.channel.send("No tienes suficientes permisos para hacer eso.")
  }
 }});

//____ELIMINAR_____
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "remove vip")) {
const db = require('megadb'); 
let vip = new db.crearDB('vip');//Aquí accedemos y creeamos en caso de no exixtir una db llamada "vip"
let supervip = new db.crearDB('supervip'); //Creamos una db por encíma de vip para que los vip no se puedan auto eliminar o eliminar a otros
        var id = message.author.id//Declaramos que "id" es la id del aútor del mensaje
      if(message.guild == null) return; //Revisamos que el canal no sea dm. en caso de que lo sea no hará nada
    
      if(supervip.tiene(id)){ //Aquí revisamos que el aútor del mensaje este en la db de supervip
        let user = message.mentions.members.first();
        if(!user) return message.channel.send ("__¡Debes mencionar a un usuario!__")
        if(!vip.has(user.id))return message.channel.send("__**Este usuario no esta registrado.**__")//Aquí miramos si el usuario mencionado NO está en la db de "vip"
        vip.eliminar(user.id, user.user.tag);
        const embed = new Discord.MessageEmbed()
            .setDescription("__"+user.user.tag+"__ **Ha sido **ELIMINADO** de los usuarios VIP.**")
            .setColor("Red")
        message.channel.send(embed)
  }else{
        message.channel.send("No tienes suficientes permisos para hacer eso.")
  }
 }});
//______LISTA______
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "lista")) {
let vip = new db.crearDB('vip');//Aquí accedemos y creeamos en caso de no exixtir una db llamada "vip"
let supervip = new db.crearDB('supervip'); //Creamos una db por encíma de vip para que los vip no se puedan auto eliminar o eliminar a otros
    if(vip.size() < 1) return message.channel.send('No hay usuarios en la lista.'); //  Si no hay usuarios en la db esto envia una mensaje.
    
    //  Ahora la palabra 'key' es el nombre principal del JSON ej:
    //  Este seria la database en JSON
//  {
//   "914845599388089363": { //Esto es key siempre, los demas subdatos son v = valor, si requerimos uno ponemos 'v.discord_nombre' porque le pusimos 'discord_nombre'
//   "discord_nombre": "爪卂尺匚#0001",
//   "discord_servidor": ""
//  }
//  }

    //  Comemzamos con la busqueda de la lista de usuarios
    vip.map(false, (v, key) => `> Usuario ID: ${key}\nNombre: ${v.nombre_discord}\nServidor: ${v.nombre_servidor}`).then(vip => {
      return message.channel.send(vip.join("\n\n"))
      
      //  Esto hara que separe cada usuario a la siguiente linea, para que no se acomulen.
      // Quedaria asi:
      // dato1 
      // dato2
      // dato3
      // tantos datos como hayas agregado
    }) 

}});
