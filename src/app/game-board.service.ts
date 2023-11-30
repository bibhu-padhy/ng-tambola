// game-board.service.ts
import { Injectable } from '@angular/core';

export interface BoardNumber {
  number: number;
  called: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  generateBoard(): number[][][] {
    const ticketsCount = 6;
    const rowsPerTicket = 3;
    const colsPerTicket = 9;
    const numbersPerRow = 5;
    const numbersPerTicket = 15;
    const boardNumbers: number[][][] = [];

    // Initialize the board with empty tickets
    for (let ticketIndex = 0; ticketIndex < ticketsCount; ticketIndex++) {
      let ticket = Array.from({ length: rowsPerTicket }, () =>
        new Array(colsPerTicket).fill(0)
      );
      boardNumbers.push(ticket);
    }

    // Define the number ranges for each column
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

    // Fill the board with actual numbers
    ranges.forEach((range, colIndex) => {
      let columnNumbers = this.shuffleArray(this.range(range.start, range.end));
      let placeholderCount = Math.floor(
        (ticketsCount * numbersPerRow) / rowsPerTicket
      );
      columnNumbers = columnNumbers.slice(0, placeholderCount); // Only take as many numbers as placeholders

      // Distribute column numbers across all tickets
      columnNumbers.forEach((number) => {
        let placed = false;
        while (!placed) {
          let ticketIndex = this.getRandomInt(0, ticketsCount - 1);
          let rowIndex = this.getRandomInt(0, rowsPerTicket - 1);
          if (boardNumbers[ticketIndex][rowIndex][colIndex] === 0) {
            boardNumbers[ticketIndex][rowIndex][colIndex] = number;
            placed = true;
          }
        }
      });
    });

    // Replace any undefined values with 0
    boardNumbers.forEach((ticket) => {
      ticket.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === undefined) {
            row[i] = 0;
          }
        }
      });
    });

    return boardNumbers;
  }

  // The getRandomInt, range, and shuffleArray functions remain unchanged

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // The range and shuffleArray functions remain unchanged

  // The range function remains unchanged

  private range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
