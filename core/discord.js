/* This file manages the discord connection and dispatches on discord events 
   Discord.js documentation : https://discord.js.org/#/docs/main/stable/class/Client
*/

module.exports = () => new Promise((resolve, reject) => {

    console.log(`Initializing discord`)

    //Initialize a new discord client
    const Discord = require('discord.js');
    client = new Discord.Client();


    //Attach the discord client to the global bot object
    bot.discord.client = client;


    //DISCORD MESSAGE HANDLER
    //Emitted on every message the bot sees
    client.on('message', async message => {

        //Ignore bot-athors and content missing the prefix
        if( !message.content.startsWith(bot.discord.prefix) || message.author.bot ) return

        //Parse the command out of the message content
        //Split on space(s) 
        const words = message.content.split(/\s+/)
        
        //take the characters after the prefix of the first word
        const cmd = words[0].slice(bot.discord.prefix.length)
        
        //Check if there's a quick-map for this command
        if( bot.discord.module_map[cmd] ) {
        
            //The following try/catch will run a module if the command name matches 
            try {
                
                //Load the module that matched the command
                const module_name = bot.discord.module_map[cmd]
                const command_module = bot.load_module( module_name )
                //If module is self-envoking, it will run itself now

            
                //If module is a function, run the function and pass message
                //Promisify and await the function 
                if( typeof command_module == 'function' ) {
                    await new Promise(end => end())
                        .then(() => command_module( message ))
                }
                
            } catch(e) {
            
                //Log loading or command errors or to console
                console.error(e)
                
            }
            
            return
        
        }

        
        /* ===================================
            Define your custom commands below 
           =================================== */
        
        






    })




    //DISCORD READY HANDLER
    //Emitted when client connects to discord
    client.on("ready", () => {

        //Sets bot activity and status
        client.user.setPresence({
            activity:{
                name: 'with J.A.V.A', 
                type: 'PLAYING'
            }, 
            status: 'online'
        }); 

        //General Bot information into botlog
        let reboottime = new Date();
        console.log(`Discord connected as`, client.user.tag, 'on', reboottime.toLocaleString());
        console.log(`Monitoring ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
        console.log('')
        
        //Finish the module load
        resolve()

    });



    // Login to discord - "logged in" triggers "ready" event above
    // Do this at the end of file after all the event handlers have been defined
    client.login(bot.discord.token)

})
