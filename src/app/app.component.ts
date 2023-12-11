import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RandomNumberService } from './services/random-number.service';
import { PlayerTicket, TicketService } from './ticket.service';
import { GameBoardService } from './game-board.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  boardNumbers = this.gameBoardService.generateBoardNumbers();
  tickets: PlayerTicket = [];
  currentNumber: number = 0;
  countdown = 3; // Countdown from 30 seconds
  private subscription: Subscription | undefined;

  constructor(
    private randomNumberService: RandomNumberService,
    private gameBoardService: GameBoardService
  ) {}

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.countdown = 3; // Reset countdown
        this.currentNumber = this.randomNumberService.getNextNumber();
        this.gameBoardService.selectNumber(this.currentNumber);
      }
    });
    this.refreshBoard();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  refreshBoard() {
    this.gameBoardService.generateBoard();
  }
}
