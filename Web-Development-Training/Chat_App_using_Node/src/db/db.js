const {Sequelize, DataTypes, Op} = require("sequelize");
const chalk = require("chalk");
const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDB}`);

(async()=>{
    try{
        await sequelize.authenticate();    
        console.log(chalk.bgGreen("We were able to connect to the db."));
    }catch(err){
        console.log(chalk.bgRed("bg: " + err ));
    }
})();



module.exports = {
    sequelize, 
    Sequelize, 
    DataTypes, 
    Op
};


