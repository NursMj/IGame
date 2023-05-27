import Table from 'cli-table'
import WinnerDefiner from './WinnerDefiner.js'

export default class TableGenerator {
    constructor(moves) {
        this.moves = moves
        this.table = new Table()
    }

    generateTable(moves) {
        this.table.push(['PC Moves', ...moves])
        moves.forEach(m => {
            const row = [m]
            moves.forEach(i => row.push(new WinnerDefiner(moves, m, i).defineWinner()))
            this.table.push(row)})
    }

    showTable() {
        this.generateTable(this.moves)
        console.log(this.table.toString()) 
    }
}
