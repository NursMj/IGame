

export default class WinnerDefiner {
    constructor(moves, firstPlayerMove, secondPlayerMove) {
        this.moves = moves
        this.firstPlayerMove = firstPlayerMove
        this.secondPlayerMove = secondPlayerMove
        this.index = moves.indexOf(firstPlayerMove)
        this.index2 = moves.indexOf(secondPlayerMove)
        this.halfLength = Math.floor(moves.length / 2)
    }

    isIndexInFirstHalf() {
        return this.index < this.moves.length / 2
    }

    getCircularEndOfHalf() {
        const length = this.moves.length
        return (this.index + this.halfLength + 1 % length + length) % length
    }

    getNextHalf() {
        const endIndex = this.getCircularEndOfHalf(),
        startIndex = this.index + 1
        return (this.isIndexInFirstHalf(this.index) ? 
            this.moves.slice(startIndex, endIndex) : 
            [...this.moves.slice(startIndex),...this.moves.slice(0, endIndex)])
    }

    defineWinner() {
        if (this.index === this.index2) return 'draw'
        return this.getNextHalf().includes(this.secondPlayerMove) ? 
        ('win') : ('lose')
    }
}