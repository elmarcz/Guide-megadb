//_____PREFIX______
let prefix = "your-prefix"
//______ADD_______
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "add vip")) {
const db = require('megadb'); 
let vip = new db.crearDB('vip'); //Here we access and create a db called "vip" if it does not exist.
    let supervip = new db.crearDB("supervip") //Create a db above vip so that vip cannot self-delete or delete others.
        var id = message.author.id//Declare that "id" is the id of the message's autor

      if (message.guild == null) return; //Check that the channel is not dm. if it is, it will do nothing.
      
    
      if(supervip.tiene(id)){//Aquí revisamos que el aútor del mensaje este en la db de supervip
        let user = message.mentions.members.first();
        if(!user) return message.channel.send ("__¡You must mention a user!__")
        if(vip.has(user.id))return message.channel.send("__**This user is already registered.**__")//Aquí miramos si el usuario mencionado SI está en la db de "vip"
        vip.establecer(user.id, user.user.tag);
        const embed = new Discord.MessageEmbed()
            .setDescription("__"+user.user.tag+"__ **has been added to VIP users.**")
            .setColor("Red")
        message.channel.send(embed)
  }else{
    message.channel.send("You don't have enough permissions to do that.")
  }
 }});

//____DELETE_____
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "remove vip")) {
const db = require('megadb'); 
let vip = new db.crearDB('vip');//Aquí accedemos y creeamos en caso de no exixtir una db llamada "vip"
let supervip = new db.crearDB('supervip'); //Creamos una db por encíma de vip para que los vip no se puedan auto eliminar o eliminar a otros
        var id = message.author.id//Declaramos que "id" es la id del aútor del mensaje
      if(message.guild == null) return; //Check that the channel is not dm. if it is, it will do nothing.
    
      if(supervip.tiene(id)){ //Aquí revisamos que el aútor del mensaje este en la db de supervip
        let user = message.mentions.members.first();
        if(!user) return message.channel.send ("__!You must mention a user!__")
        if(!vip.has(user.id))return message.channel.send("__**This user is not registered.**__")//Here we check if the mentioned user is NOT in the "vip" db.
        vip.eliminar(user.id, user.user.tag);
        const embed = new Discord.MessageEmbed()
            .setDescription("__"+user.user.tag+"__ **Has been **Removed** from VIP users.**")
            .setColor("Red")
        message.channel.send(embed)
  }else{
        message.channel.send("You don't have enough permissions to do that.")
  }
 }});
//______LISTA______
client.on('message', (message) => { 
  if(message.content.toLowerCase().startsWith(prefix + "list")) {
let vip = new db.crearDB('vip');//Here we access and create a db called "vip" if it does not exist.
let supervip = new db.crearDB('supervip'); //Create a db above vip so that vip cannot self-delete or delete others.
    if(message.guild == null) return; //Check that the channel is not dm. if it is, it will do nothing.
    if(supervip.tiene(id)){
    if(vip.size() < 1) return message.channel.send('Ther are no users in this db'); //If there are no users in the db this sends a message.
    
    // Now the word 'key' is the main name of the JSON ex:
    // This would be the database in JSON
// {
// "914845599388089363": { //This is always key, the other subdata are v = value, if we require one we put 'v.discord_name' because we put 'discord_name'.
// "discord_name": "爪卂尺匚#0001",
// "discord_server": ""
// }
// }

    // We start with the search of the list of users
    vip.map(false, (v, key) => `> Usuario ID: ${key}\nNombre: ${v.nombre_discord}\nServidor: ${v.nombre_servidor}`).then(vip => {
      return message.channel.send(vip.join("\n\n"))
      
      // This will separate each user to the next line, so they don't overlap.
      // It would look like this:
      // data1 
      // data2
      // data3
      // as much data as you have added
    }) 

    }}});
