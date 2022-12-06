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


# Conclusion
In order to get the best performance, get rid of console.log and always use cluster mode! 