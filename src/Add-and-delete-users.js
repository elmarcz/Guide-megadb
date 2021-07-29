exports.run = async (client, message, args) => {
    const megadb = require('megadb')
    const Discord = require('discord.js')
    
    // Use the createDB constructor for the database
    let usuarios_db = new megadb.crearDB("usuarios")// File will be created in mega_databases/users.json
    


if(args[0] === 'add') {

    let sujeto = message.mentions.users.first(); // Declaramos el usuario mencionado
   
           if (usuarios_db.tiene(`${user.id}`))
               return message.reply(`${user} ya esta agregado a la lista.`);
           usuarios_db.establecer(`${user.id}`, {
               nombre_discord: sujeto.tag, // ej. sergiodiscord#1032
           nombre_servidor: message.guild.name // ej. Sergio's projects	
                   });
           message.channel.send(sujeto + ' ha sido agregado a la lista.');
   
   

};


if(args[0] === 'list') {

    if(usuarios_db.size() < 1) return message.channel.send('No hay usuarios en la lista.'); //  Si no hay usuarios en la db esto envia una mensaje.
    
    //  Ahora la palabra 'key' es el nombre principal del JSON ej:
    //  Este seria la database en JSON
//  {
//   "473901560179589120": { //Esto es key siempre, los demas subdatos son v = valor, si requerimos uno ponemos 'v.discord_nombre' porque le pusimos 'discord_nombre'
//   "discord_nombre": "sergiodiscord#1032",
//   "discord_servidor": "Sergio's Project"
//  }
//  }

    //  Comemzamos con la busqueda de la lista de usuarios
    usuarios_db.map(false, (v, key) => `> Usuario ID: ${key}\nNombre: ${v.nombre_discord}\nServidor: ${v.nombre_servidor}`).then(lista_usuarios => {
      return message.channel.send(lista_usuarios.join("\n\n"))
      
      //  Esto hara que separe cada usuario a la siguiente linea, para que no se acomulen.
      // Quedaria asi:
      // dato1 
      // dato2
      // dato3
      // tantos datos como hayas agregado
    }) 

};

if(args[0] === 'delete') {

  //Proceso al eliminar el usuario de la database
    
    let sujeto = message.mentions.users.first()
    if(!usuarios_db.tiene(`${sujeto.id}`)) return message.reply("ese usuario no esta en la lista.") //Si el usuario no esta en la lista manda el mensaje y no sucede nada.
    usuarios_db.eliminar(`${sujeto.id}`)  //Se elimina el usuario de la lista.
    return message.channel.send(sujeto+" ha sido eliminado de la lista."); 

}


   };
