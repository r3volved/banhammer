module.exports = ( message ) => {

    if( !bot.discord.masters.find(id => id == message.author.id) )
        return message.reply('this is a botmaster commad')
                
    bot.discord.client.destroy()
    process.exit(0)
    
}
