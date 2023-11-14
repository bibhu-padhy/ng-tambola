import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {
  private numbers: number[] = [];
  private currentIndex = 0;

  constructor() {
    this.initNumbers();
  }

  private initNumbers(): void {
    this.numbers = Array.from({ length: 90 }, (_, i) => i + 1);
    this.shuffleArray(this.numbers);
  }

  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getNextNumber(): number | null {
    if (this.currentIndex < this.numbers.length) {
      const nextNumber = this.numbers[this.currentIndex];
      this.currentIndex++;
      return nextNumber;
    }
    return null; 
  }
}
