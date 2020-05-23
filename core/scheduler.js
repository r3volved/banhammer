/* This file manages the scheduler to schedule dispatching 
   Node-schedule documentation : https://www.npmjs.com/package/node-schedule
*/

module.exports = () => new Promise((resolve, reject) => {

    console.log(`Initializing scheduler`)

    //Initialize a new scheduler
    const client = require('node-schedule');	//timer/schedule


    //Attach the scheduler to the global bot object
    bot.scheduler.client = client;


    /* =============================
        Schedule your modules below 
       ============================= */


    //Example
    //This is a scheduler look up node-schedule for more info
    //currently set to every minute on the 30 second mark it will take action
    console.log(`Scheduling example job`)
    bot.scheduler.example = client.scheduleJob(
        '30 * * * * *', 
        function(fire_date) {
            bot.scheduler.count = bot.scheduler.count || 0
            console.log('Example job', ++bot.scheduler.count, fire_date.toLocaleString());
        }
    );



    console.log(`Scheduled`, Object.keys(client.scheduledJobs).length, `job(s)`)
    console.log('')
  
    //Finish the module load
    resolve()
          
})
