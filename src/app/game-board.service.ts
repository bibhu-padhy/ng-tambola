import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cell {
  number: number;
  selected: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private readonly BOARD_SIZE = 9;
  private readonly COLUMN_SIZE = 18;
  private readonly TICKET_SIZE = 3;

  private boardNumbers = new BehaviorSubject<Cell[][][]>([]);

  generateBoardNumbers(): Observable<Cell[][][]> {
    return this.boardNumbers.asObservable();
  }

  generateBoard() {
    const boardNumbers: Cell[][] = this.generateBoardNumbersColumns();
    const ticketBoard: Cell[][][] = [];

    for (let i = 0; i < this.COLUMN_SIZE; i += this.TICKET_SIZE) {
      const ticketGroup: Cell[][] = [];

      for (let j = 0; j < this.TICKET_SIZE; j++) {
        const ticket = boardNumbers.map(column => column[i + j]);
        ticketGroup.push(ticket);
      }

      ticketBoard.push(ticketGroup);
    }
    console.log(ticketBoard);

    this.boardNumbers.next(ticketBoard);
  }

  selectNumber(number: number): void {
    const currentBoard = this.boardNumbers.value;

    currentBoard.forEach(ticketGroup => {
      ticketGroup.forEach(ticket => {
        const matchingCell = ticket.find(cell => cell.number === number);
        if (matchingCell) {
          matchingCell.selected = true;
        }
      });
    });

    console.log(currentBoard);


    this.boardNumbers.next(currentBoard);
  }

  private generateBoardNumbersColumns(): Cell[][] {
    const boardNumbers: Cell[][] = Array.from({ length: this.BOARD_SIZE }, () => []);

    for (let columnIndex = 0; columnIndex < this.BOARD_SIZE; columnIndex++) {
      const columnNumbers = this.shuffleArray(this.range(columnIndex));
      const column: Cell[] = Array.from({ length: this.COLUMN_SIZE }, (_, i) => ({
        number: i % 2 === columnIndex % 2 ? columnNumbers.shift() ?? 0 : 0,
        selected: false
      }));

      boardNumbers[columnIndex] = column;
    }

    return boardNumbers;
  }





  private range(index: number): number[] {
    const ranges = [
      { start: 1, end: 9 },
      { start: 10, end: 19 },
      { start: 20, end: 29 },
      { start: 30, end: 39 },
      { start: 40, end: 49 },
      { start: 50, end: 59 },
      { start: 60, end: 69 },
      { start: 70, end: 79 },
      { start: 80, end: 90 },
    ];
    return Array.from(
      { length: ranges[index].end - ranges[index].start + 1 },
      (_, i) => ranges[index].start + i
    );
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}