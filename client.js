const net = require('net'), colors = require('colors'), readlineSync = require('readline-sync'), Process = require('process'), cp = require('child_process')

let client = null
// !!!!!!!!!!! FLEMME DE COMMENTER VENER DISCORD POUR ME DEMANDER DE L'AIDE : ~{ Skillo }~#8046
//1
function openConnection() {
    if(client) {
        console.log('\n->  Une instance est déjà ouverte !  <-\n'.red)
        setTimeout( () => {
            mainMenu()
        }, 0)
        return
    }

    client = new net.Socket()

    client.on('error', (err) => {
        client.destroy()
        client = null
        console.log('\n->  Une erreur est survenue !  <-\n More information ~~> %s\n'.red, err.message.red)
        setTimeout( () => {
            mainMenu()
        }, 0)
        return
    })
    let pHost = readlineSync.question('Enter HOST ~> '), pPort = parseInt(readlineSync.question('Enter PORT ~> '))
    client.connect(pPort, pHost, () => {
        console.log('\n[ Connection succesfull ! ]\n'.green)
        setTimeout( () => {
            mainMenu()
        }, 0)
    })
}

//2
function sendMessage() {
    if(!client){
        console.log('\n->  You must to open a session first  <-\n'.red)
        mainMenu()
    }
    let valueToSend = readlineSync.question('\nEnter a message ~> ')
    client.write(valueToSend)
    console.log('\n[ Message send succesfully ! ]\n'.green)
    setTimeout( () => {
        mainMenu()
    }, 0)
}

//3
function close() {
    if(!client) {
        console.log('\n-> No session to close :/ <-\n'.red)
        setTimeout( () => {
            mainMenu()
        }, 0)
    }else if(client){
        client.destroy()
        client = null
        console.log('\n[ Connection closed succesfully ]\n'.green)
        setTimeout( () => {
            mainMenu()
        }, 0)
    }
}

//4
function quit() {
    if(!client){
        //ferme la fênetre
        console.log(' See you ! '.bold)
        cp.exec('exit')
    }else if(client){
        client.destroy()
        client = null
        console.log('\n [ Socket Destroy Succesfully ]\n'.green)
        console.log('\n See you ! \n'.bold)
        cp.exec('exit')
    }
}

//0
function mainMenu () {
    var value = readlineSync.question('Select one option :\n'.underline + ' \n[1] Open Socket\n[2] Send Message\n[3] Close\n[4] Quit\n\n --> ')
    switch (value) {
        case "1":
            openConnection()
        break
        case "2":
            sendMessage()
        break
        case "3":
            close()
        break
        case "4":
            quit()
        break
        default:
            mainMenu()
        break
        
    }
}

mainMenu()