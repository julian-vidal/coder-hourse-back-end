1. `npm i`


# Analysis with artillery y node prof

## Without console.log
1. `node --prof server.js`
2. `npx artillery quick --count 50 -n 20 "http://localhost:8080/info-nodebug" > results/nodebug/artillery_info_nodebug.txt`
3. `mv <isolate_file_name>.log log-v8-nodegub.log`
4. `node --prof-process log-v8-nodegub.log > results/nodebug/node_prof_info_nodebug.txt`

## With console.log
1. `node --prof server.js`
2. `npx artillery quick --count 50 -n 20 "http://localhost:8080/info-debug" > results/debug/artillery_info_debug.txt`
3. `mv <isolate_file_name>.log log-v8-degub.log`
4. `node --prof-process log-v8-degub.log > results/debug/node_prof_info_debug.txt`



# Analysis with 0x
1. `npm run 0x`

# Analysis with Autocannon
1. `node server.js`
1. `npm run autocannon`





# Start the server using `nodemon`
1. `nodemon server.js -p=<PORT> -m=<FORK|CLUSTER>` 

You'll see in the console the process ID for each fork

To kill a process: `kill -9 <PID>`. You'll se a message in the console saying that the worker died and a new worker will be initialized.

# Start the server using `forever`
1. `forever start -w server.js -p=<PORT> -m=<FORK|CLUSTER> `
2. List processes: `forever list`
3. Stop a process: `forever stop <PID>` OR stop all processes: `forever stopall`

# Start the server using `pm2`
1. Start in cluster mode: `pm2 start server.js --name=<APP_NAME> --watch -i max -- -p <PORT>`
2. Start in fork mode: `pm2 start server.js --name=<APP_NAME> --watch -- -p <PORT>`
3. List pm2 processes: `pm2 list`
4. Kill a pm2 process: `pm2 delete <APP_NAME>`


# Load balancer with NGNIX
1. Start in cluster mode: `pm2 start server.js --name=cluster --watch -i max -- -p 8081`
2. Start in fork mode: `pm2 start server.js --name=fork --watch -- -p 8080`
3. Copy the content of the **nginx1.conf** file and paste it in your local nginx config file replacing the current setup.
4. Start in cluster mode: `pm2 start server.js --name=cluster1 --watch -i max -- -p 8082`
5. Start in cluster mode: `pm2 start server.js --name=cluster2 --watch -i max -- -p 8083`
6. Start in cluster mode: `pm2 start server.js --name=cluster3 --watch -i max -- -p 8084`
7. Start in cluster mode: `pm2 start server.js --name=cluster4 --watch -i max -- -p 8085`
8. Copy the content of the **nginx2.conf** file and paste it in your local nginx config file replacing the current setup.




