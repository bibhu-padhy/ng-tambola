// game-board.service.ts
import { Injectable } from '@angular/core';

export interface BoardNumber {
  number: number;
  called: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {
  private boardNumbers: BoardNumber[];
  private calledNumbers: Set<number>;

  constructor() {
    this.boardNumbers = Array.from({ length: 90 }, (_, i) => ({ number: i + 1, called: false }));
    this.calledNumbers = new Set();
  }

  private generateRandomNumber(): number {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 90) + 1;
    } while (this.calledNumbers.has(randomNum));
    return randomNum;
  }

  public callNumber(): number {
    const numberToCall = this.generateRandomNumber();
    this.boardNumbers[numberToCall - 1].called = true;
    this.calledNumbers.add(numberToCall);
    return numberToCall;
  }

  public getBoardNumbers(): BoardNumber[] {
    return this.boardNumbers;
  }
}
