var Git = require("nodegit");

Git.Clone("https://github.com/taqi4/node_setup_commands.git", "./")
    // Look up this known commit.
    .then(function (repo) {
        // Use a known commit sha from this repository.
        return repo.getCommit("cb8bb9eacbb4fdadc91db963dfcd60a5faf1080c");
    })
var fs = require("fs")
var pack = require("../../package.json");
var commands = {
    "frk": './bin/commands/list.js',
    'frk-addauth': './bin/commands/add-auth.js',
    'frk-addmodule': './bin/commands/add-module.js',
    'frk-addfilefield': './bin/commands/add-file-field.js',
    'frk-rmfilefield': './bin/commands/rm-file-field.js',
    'frk-addmulter': './bin/commands/add-multer.js'
};
Object.keys(commands).forEach(function (key) {
    pack.bin[key] = commands[key];
});
fs.writeFileSync("./package.json", JSON.stringify(pack, null, 2));
var cmd = require("node-cmd");
cmd.run("npm link");