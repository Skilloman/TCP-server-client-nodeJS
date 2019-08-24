// I'm not english, sorry for bad comments
const net = require('net') // import net module
const colors = require('colors') // import colors module
let server = net.createServer() // create a server
let thePort = 6969 // set the listener port
server.on('connection', (socket) => { // event when a connection occureed
    let remoteInfo = socket.remoteAddress + ":" + socket.remotePort // set infos about remote user
    let nC = "\n[ New connection ! ], "

    console.log('%s from ~> %s'.green, nC, remoteInfo) // console info about remote user
    socket.on('data', (msg) => { // event when data is coming to the server
        console.log('\nNew message from %s \n--> %s', remoteInfo, msg); // console.log data content
    })

    socket.on('close', () => { // event when connection closed
        console.log('[ Connection closed ]'.red.bold) // console.log closed connection
    })
    
    socket.on('error', (err) => { // event when error occured 
        console.log(`\n-> Oups an error occured :/ <- \nMore infos ~~> ${err.message}\n`.red) // console.log error infos
    })
})

server.listen(thePort, function() { // listen on the port
    console.log(`Server listening ... port : ${thePort}`.rainbow) 
})