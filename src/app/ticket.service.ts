import { Injectable } from '@angular/core';

interface TicketCell {
  number: number | null;
  marked: boolean;
}

type TicketRow = TicketCell[];
export type PlayerTicket = TicketRow[];

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createEmptyTicket(): PlayerTicket {
    return new Array(3).fill(null).map(() => new Array(9).fill({ number: null, marked: false }));
  }

  public populateTicket(ticket: PlayerTicket): PlayerTicket {
    for (let row = 0; row < 3; row++) {
      let numbersPlaced = 0;
      while (numbersPlaced < 5) {
        let randomColumn = this.generateRandomNumber(0, 8);
        if (ticket[row][randomColumn].number === null) {
          let columnRangeStart = randomColumn * 10 + 1;
          let columnRangeEnd = columnRangeStart + 9;
          ticket[row][randomColumn] = {
            number: this.generateRandomNumber(columnRangeStart, columnRangeEnd),
            marked: false
          };
          numbersPlaced++;
        }
      }
    }
    return ticket;
  }

  public generateTicket(): PlayerTicket {
    let ticket = this.createEmptyTicket();
    return this.populateTicket(ticket);
  }
}
