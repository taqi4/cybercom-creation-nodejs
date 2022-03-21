var {Umzug,SequelizeStorage} = require("umzug");
var fs =require("fs");
const path = require("path");
var paths = "";
fs.readdirSync("../ideal-api/api")
.forEach(e=>{
    paths+=`./api/${e}/migrations/*.js,`;
});
const umzug = new Umzug({
    migrations: { glob: `{${paths}./db/migrations/*.js}` },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
  
  (async () => {
    
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    let pending = await umzug.pending();
    
    if(pending.length>0){
      console.log("pending migrations are");
      pending.forEach(e=>console.log(colors.yellow(e.name)));
      readline.question(` do you want to migrate them yes/no?`,
      async (name)=>{
        if(name=="yes")  
        {await umzug.up();
        console.log(await umzug.executed());
      }});
    }
  })();
  