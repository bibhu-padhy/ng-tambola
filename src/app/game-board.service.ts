import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface BoardNumber {
  number: number;
  called: boolean;
}

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
  private readonly TICKER_SIZE = 3;

  private boardNumbers = new BehaviorSubject([] as Cell[][][]);

  generateBoardNumbers(): Observable<Cell[][][]> {
    return this.boardNumbers.asObservable();
  }

  generateBoard() {
    const boardNumbers: number[][] = this.generateBoardNumbersColumns();
    const ticketBoard: Cell[][][] = [];

    for (let i = 0; i < boardNumbers[0].length; i += this.TICKER_SIZE) {
      const ticketGroup: Cell[][] = [];

      for (let j = 0; j < this.TICKER_SIZE; j++) {
        const ticket = boardNumbers
          .map((column) => ({ number: column[i + j], selected: false }))
          .flat();
        ticketGroup.push(ticket);
      }
      console.log(ticketGroup);
      
      ticketBoard.push(ticketGroup);
    }
    this.boardNumbers.next(ticketBoard);
  }

  selectNumber(number: number): void {
    const currentBoard = this.boardNumbers.value;
    console.log(number);
    
    // Loop through tickets and set 'selected' property for the matching number
    for (const ticketGroup of currentBoard) {
      for (const ticket of ticketGroup) {
        const matchingNumber = ticket.find((cell) => {
          // console.log(cell);
          
          return cell.number === number
        });

        if (matchingNumber) {
          matchingNumber.selected = true;
        }
        console.log(matchingNumber);
      }
    }
    console.log(currentBoard);

    // Update the BehaviorSubject with the modified board
    this.boardNumbers.next(currentBoard);
  }

  private generateBoardNumbersColumns(): number[][] {
    const boardNumbers: any[][] = [];
    for (let columnIndex = 0; columnIndex < this.BOARD_SIZE; columnIndex++) {
      const column = Array.from({ length: this.COLUMN_SIZE }, () =>
        Array(1).fill(0)
      );
      const columnNumbers = this.shuffleArray(this.range(columnIndex));

      for (let j = 0; j < this.COLUMN_SIZE; j++) {
        const isEvenColumn = columnIndex % 2 === 0;
        const isEvenIndex = j % 2 === 0;

        if ((isEvenColumn && isEvenIndex) || (!isEvenColumn && !isEvenIndex)) {
          column[j][0] = columnNumbers.shift();
        }
      }

      boardNumbers.push(column);
    }
    return boardNumbers;
  }

  // Other methods remain unchanged...

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
