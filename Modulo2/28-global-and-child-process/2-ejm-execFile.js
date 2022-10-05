const {execFile} = require("child_process")

execFile(__dirname + "/program.sh", (err, stdout, stderr) => {
    if (err) {
        console.error(`error: ${err.message}`)
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: \n${stdout}`)
})

console.log("Hola")

/*
In this scenario, "sleep 1; ls -lh" is the child process. 
It's non-blocking process because it shows "Hola" first, and 1 sec later runs "ls -lh"

*/