// game-board.service.ts
import { Injectable } from '@angular/core';

export interface BoardNumber {
  number: number;
  called: boolean;
}

export interface cell {
  value: number;
  isZero: boolean;
  index: number
}

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  currentColumn: number[] = [];
  generateBoard(): number[][] {
    const ticketsCount = 6;
    const rowsPerTicket = 3;
    const colsPerTicket = 9;
    const numbersPerRow = 5;
    const numbersPerTicket = 15;
    let boardNumbers: any[][] = [];
    let ticketBoard:any = []

    console.log(boardNumbers);

    for (let index = 0; index < 9; index++) {
      const column = Array.from({ length: 18 }, () => Array(1).fill(0));
      const columnNumbers = this.shuffleArray(this.range(index));
      for (let j = 0; j < column.length; j++) {

        if (index % 2 === 0) {
          if (j % 2 === 0 ) {
            column[j][0] = columnNumbers.shift()
          }
        }

        if (index % 2 !== 0) {
          if (j % 2 !== 0 ) {
            column[j][0] = columnNumbers.shift()
          }
        }

      }
      boardNumbers.push(column)
    }
    boardNumbers = boardNumbers.map(a => a.flat(2));
    
    console.log(this.rotateArray90Degrees(boardNumbers));
    
this.reshapeArray(this.rotateArray90Degrees(boardNumbers)).forEach(ticket=>{
  
  ticket.forEach(t=>{
    console.log(t);
    
    ticketBoard.push(t)
  })
})

console.log(ticketBoard);

    return boardNumbers;
  }

  // Function to rotate the array 90 degrees clockwise
  rotateArray90Degrees(array:number[][]) {
    const rows = array.length;
    const columns = array[0].length;
    const rotatedArray:number[][] = [];
  
    for (let i = 0; i < columns; i++) {
      rotatedArray.unshift([]); // Unshift is used to add rows at the beginning
      for (let j = 0; j < rows; j++) {
        rotatedArray[0].push(array[j][i]);
      }
    }
  
    return rotatedArray;
  }

// Function to reshape the array into a 3D array with tickers
reshapeArray(array: number[][]): number[][][] {
  const tickerSize = 3;
  const rowsPerTicker = tickerSize * 2; // 2 tickers per group
  const tickerGroups: number[][][] = [];

  for (let i = 0; i < array.length; i += rowsPerTicker) {
    const tickerGroup: any[][] = [];
    for (let j = 0; j < tickerSize; j++) {
      tickerGroup.push([...array.slice(i + j * tickerSize, i + (j + 1) * tickerSize)]);
    }
    tickerGroups.push(tickerGroup);
  }

  return tickerGroups;
}

  // The range function remains unchanged

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
    return Array.from({ length: ranges[index].end - ranges[index].start + 1 }, (_, i) => ranges[index].start + i);
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
