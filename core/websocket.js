/* This file manages the websocket connection and dispatches on websocket events 
   Websocket documentation : https://discord.js.org/#/docs/main/stable/class/Client
*/

module.exports = () => new Promise((resolve, reject) => {

    console.log(`Initializing websocket`)

    //Initialize a new discord client
    const Websocket = require('reconnecting-websocket');
    client = new Websocket(bot.websocket.url, bot.websocket.args, bot.websocket.options)


    //Attach the discord client to the global bot object
    bot.websocket.client = client;
    

    //WEBSOCKET ERROR HANDLER
    //Emitted when websocket sees an error
    client.addEventListener('error', (error) => {
        console.log('Websocket Error!')
        console.error(error)
    });


    //WEBSOCKET OPEN HANDLER
    //Emitted when websocket opens connection
    client.addEventListener('open', () => {
        console.log('Websocket connected to:', bot.websocket.url)
        console.log('')
        resolve()
    });

    //WEBSOCKET MESSAGE HANDLER
    //Emitted on every message the websocket sees
    client.addEventListener('message', async (message) => {
        var data = {}
        try { 
        
            //Try to get json data from message                    
            data = JSON.parse(message.data) 
        
        } catch(e) {
        
            //Otherwise return text
            data = message.data 
        
        }

        //Check if there's a quick-map for this command
        if( typeof data == 'string' ) { 
        
            //Parse the command out of the message content
            //Split on space(s) 
            const words = data.split(/\s+/)
            
            //take the characters after the prefix of the first word
            const cmd = words[0]
            
            if( bot.websocket.module_map[cmd] ) {
                //The following try/catch will run a module if the command name matches 
                try {
                    
                    //Load the module that matched the command
                    const module_name = bot.websocket.module_map[cmd]
                    const command_module = bot.load_module( module_name )
                    //If module is self-envoking, it will run itself now

                
                    //If module is a function, run the function and pass message
                    //Promisify and await the module 
                    if( typeof command_module == 'function' ) {
                        await new Promise(end => end())
                            .then(() => command_module( data ))
                    }
                    
                } catch(e) {
                
                    //Log loading or command errors or to console
                    console.error(e)
                    
                }
            }            
            return
        
        }

        
        /* ===================================
            Define your custom comamnds below 
           =================================== */
        





    });                         

})
