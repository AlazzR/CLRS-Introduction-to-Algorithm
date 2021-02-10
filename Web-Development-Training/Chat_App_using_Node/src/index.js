const {server} = require("./app");
const chalk = require("chalk");

server.listen(process.env.PORT, ()=>{
    console.log(chalk.bgGreen("The server is runnin on " + process.env.PORT));
});