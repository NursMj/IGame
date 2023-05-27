import Game from './Game.js'

const moves = process.argv.slice(2)

if (moves.length < 3 || moves.length % 2 === 0) {
    console.log('Invalid number of moves! Please provide an odd and at least 3 number of moves.')
    console.log('Example: node main.js rock paper scissors lizard Spock')
} else if (new Set(moves).size != moves.length) {
    console.log('All moves must be unique!')
    console.log('Example: node main.js rock paper scissors lizard Spock')
} else {
    const game = new Game(moves)
    game.startGame()
}