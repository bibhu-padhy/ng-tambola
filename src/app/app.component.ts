import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RandomNumberService } from './services/random-number.service';
import { PlayerTicket, TicketService } from './ticket.service';
import { BoardNumber, GameBoardService } from './game-board.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boardNumbers: BoardNumber[] = []
  tickets: PlayerTicket = [];
  currentNumber: number | null = null;
  countdown = 30; // Countdown from 30 seconds
  private subscription: Subscription | undefined;

  constructor(private randomNumberService: RandomNumberService,
    private ticketService: TicketService,
    private gameBoardService: GameBoardService) { }


  ngOnInit() {

    // this.subscription = interval(1000).subscribe(() => {
    //   if (this.countdown > 0) {
    //     this.countdown--;
    //   } else {
    //     this.countdown = 30; // Reset countdown
    //     this.currentNumber = this.randomNumberService.getNextNumber();
    //   }
    // });


    let ONE_TO_NINE = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 1; i < 10; i++) {
      ONE_TO_NINE.push(i)
    }
    ONE_TO_NINE = this.shuffleArray(ONE_TO_NINE)
    console.log(ONE_TO_NINE);
  }

  shuffleArray(array: number[]): number[] {
    let n = array.length;

    // Initialize the zero count
    let zeroCount = 0;

    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      // Check for consecutive zeros condition
      if (array[i] === 0 || array[j] === 0) {
        if (zeroCount >= 3) {
          // If there are already 3 consecutive zeros, skip this iteration
          continue;
        }
        zeroCount++;
      } else {
        // Reset zero count if current elements are not zeros
        zeroCount = 0;
      }

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
