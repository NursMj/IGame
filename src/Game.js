import readlineSync from 'readline-sync'
import _ from 'lodash'
import KeyAndHMACGenerator from "./KeyAndHMACGenerator.js"
import WinnerDefiner from './WinnerDefiner.js'
import TableGenerator from './TableGenerator.js'

export default class Game {
    constructor(moves) {
        this.moves = moves
        this.key = null
        this.hmac = null
        this.pcMove = null
        this.userMove = null
    }

    makeMove() {
        this.pcMove = this.moves[Math.floor(Math.random() * this.moves.length)]
    }

    generateKey() {
        this.key = new KeyAndHMACGenerator().generateKey(32)
    }

    generateHMAC() {
        this.hmac = new KeyAndHMACGenerator().calculateHMAC(this.key, this.pcMove)
    }

    displayMenu() {
        console.log('Available moves:')
        this.moves.forEach((m, i) => console.log(`${i + 1} - ${m}`))
        console.log('0 - exit')
        console.log('? - help')
    }

    checkInput(input) {
        return (_.times(this.moves.length + 1, (i) => `${i}`).includes(input) || input === '?')
    }

    takeUserMove() {
        const input = readlineSync.question('Enter your move: ')
        if (this.checkInput(input)) return this.handleUserMove(input)
        this.displayMenu()
        this.takeUserMove()
    }   

    handleHelp() {
        new TableGenerator(this.moves).showTable()
        this.takeUserMove()
    }

    handleUserMove(userMove) {
        if(userMove === '?') return this.handleHelp()
        if(userMove === '0') return console.log('Exit')
        this.userMove = this.moves[userMove - 1]
    }

    defineWinner() {
        const res = new WinnerDefiner(this.moves, this.pcMove, this.userMove).defineWinner()
        if (res === 'draw') return 'It is a draw!'
        return res === 'win' ? 'You win!' : 'You lose!'
    }
    
    initiatGame() {
        this.generateKey()
        this.makeMove()
        this.generateHMAC()
        console.log('HMAC:', this.hmac)
        this.displayMenu()
    }

    showResults() {
        console.log('Your move: ' + this.userMove)
        console.log('Computer move: ' + this.pcMove)
        console.log(this.defineWinner())
        console.log('HMAC key: ' + this.key.toString('hex'))
    }

    startGame() {
        this.initiatGame()
        this.takeUserMove()
        if (this.userMove) this.showResults()
    }
}