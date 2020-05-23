/* This file manages the sqlite3 settings 
   slite3 documentation : https://github.com/mapbox/node-sqlite3/wiki
*/

module.exports = () => new Promise((resolve, reject) => {

    console.log(`Initializing settings`)

    //initialize connection to sqlite3 DB
    const sqlite3 = require('sqlite3');
    const db = new sqlite3.Database(`${__dirname}/../data/settings.sqlite3`); 

    //Build sql query
    const sql = `SELECT * FROM settings WHERE TABLE_ID = ${JSON.stringify(bot.settings_id)};`

    //Execute the query    
    db.each(sql, (err, row) => {
    
        if( err ) reject(err); // optional: you might choose to swallow errors.
        else {
        
            /* ====================================================
                Overwrite default settings here if existing in row 
               ==================================================== */
            
            if( row.token  ) 
                bot.discord.token = row.token
            
            if( row.prefix ) 
                bot.discord.prefix = row.prefix
                
            if( row.master ) 
                bot.discord.masters.push( row.master )
                
            if( row.mainserverid ) 
                bot.discord.home_server = row.mainserverid

            if( row.mainlogchannel ) 
                bot.discord.log_channel = row.mainlogchannel

            if( row.announcementchannel ) 
                bot.discord.announcement_channel = row.announcementchannel

            if( row.member_role ) 
                bot.discord.member_role = row.member_role            
            
        }
    
    }, (err, n) => {
        console.log('')
    
        //Close the database
        db.close();
        
        //Finish the module load
        if( err ) reject(err); // optional: again, you might choose to swallow this error.
        else resolve();
    
    });

});

