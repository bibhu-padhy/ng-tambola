import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RandomNumberService } from './services/random-number.service';
import { PlayerTicket, TicketService } from './ticket.service';
import { BoardNumber, GameBoardService } from './game-board.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  boardNumbers: number[][][] = [];
  tickets: PlayerTicket = [];
  currentNumber: number | null = null;
  countdown = 30; // Countdown from 30 seconds
  private subscription: Subscription | undefined;

  constructor(
    private randomNumberService: RandomNumberService,
    private ticketService: TicketService,
    private gameBoardService: GameBoardService
  ) {}

  ngOnInit() {
    // this.subscription = interval(1000).subscribe(() => {
    //   if (this.countdown > 0) {
    //     this.countdown--;
    //   } else {
    //     this.countdown = 10; // Reset countdown
    //     this.currentNumber = this.randomNumberService.getNextNumber();
    //   }
    // });
    this.boardNumbers = this.gameBoardService.generateBoard();
    console.log(this.gameBoardService.generateBoard());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
