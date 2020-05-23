const { existsSync } = require('fs')
const module_map = require(`${__dirname}/module_map.js`)

//Default bot settings
//Override these settings through settings.js
//"bot" is global and accessible in any module

global.bot = {

    //Used for bot settings lookup on sql db
    settings_id : "1",
    
    //Load a module by name (with optional folder override)
    load_module : ( name, folder = 'modules' ) => {
        const location = `${__dirname}/${folder}/${name.replace('.js','')}.js`
        return existsSync(location) ? require(location) : null
    },

    //Scheduler settings and client
    scheduler : {
        schedule : null, //Populate on module load
        count : 0, //Counter for incremental/value storage
        module_map : module_map["scheduled-modules"]
    },
    
    //Discord settings and client
    discord : {
        client : null, //Populate on module load
        token  : '',
        prefix : '.', 
        masters: [ '305465187799007232' ],
        home_server : '647131994701955095',
        log_channel : '647277579656757258',
        announcement_channel : '647277579656757258',
        member_role : '647277901707870208',
        module_map : module_map["discord-commands"] 
    },

    //Websocket settings and client
    websocket : {
        client : null, //Populate on module load
        url : 'ws://echo.websocket.org/',
        args : [],     //Websocket connection args
        options : {    //Websocket options
            WebSocket: require('ws'),
            maxReconnectionDelay: 120000,
            minReconnectionDelay: 1000 + Math.random() * 4000,
            reconnectionDelayGrowFactor: 2,
            connectionTimeout: 5000,
            maxRetries: 1,
        },
        module_map : module_map["websocket-commands"] 
    }
    
};


//Start
(async () => {

    //Initialize settings first to overwrite defaults
    await bot.load_module('settings', 'core')()
    
    //Initialize clients next for communications
    await bot.load_module('discord',  'core')()
    await bot.load_module('websocket','core')()

            
    //Initialize scheduler last so clients will be available
    await bot.load_module('scheduler','core')()
    
    console.log("--ready--")
    
})()
