import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RandomNumberService } from './services/random-number.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentNumber: number | null = null;
  countdown = 30; // Countdown from 30 seconds
  private subscription: Subscription | undefined;

  constructor(private randomNumberService: RandomNumberService) {}


  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.countdown = 30; // Reset countdown
        this.currentNumber = this.randomNumberService.getNextNumber();
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
