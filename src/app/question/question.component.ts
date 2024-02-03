import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

const images = [
  'assets/question/valentines-16.gif',
  'assets/question/valentines-17.gif',
  'assets/question/valentines-18.gif',
  'assets/question/valentines-19.gif',
  'assets/question/valentines-20.gif',
  'assets/question/valentines-21.gif',
  'assets/question/valentines-22.gif',
  'assets/question/valentines-23.gif',
  'assets/question/valentines-24.gif',
  'assets/question/valentines-25.gif',
  'assets/question/valentines-26.gif',
  'assets/question/valentines-27.gif',
  'assets/question/valentines-28.gif',
  'assets/question/valentines-29.gif',
  'assets/question/valentines-30.gif',
  'assets/question/valentines-31.gif',
  'assets/question/valentines-32.gif',
];

const noTexts = [
  'No',
  'Are you Sure?',
  'Really Sure?',
  'Think again!',
  'Last chance',
  'Surely Not',
  'I don\'t believe you',
  'Are you absolutely certain?',
  'It can\'t be!',
  'Give it another thought',
  'This could be a mistake!',
  'Have a heart!',
  'Did you tap the wrong button?',
  'Change of heart?',
  'Are you colorblind?',
  'Wouldn\'t you reconsider?',
  'Don\'t be so cold hearted!',
  'Is that your final Answer?',
];

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  private router = inject(Router);  

  private readonly nos = signal(0);
  readonly noText: Signal<string> = computed(() => noTexts[this.nos()]);
  readonly yesSize: Signal<string> = computed(() => `${1 + this.nos()}rem`);
  readonly yesLineHeight: Signal<string> = computed(() => `${1 + this.nos()}rem`);
  
  readonly src = signal(images[0]);
  readonly seen = signal<string[]>([]);

  ngOnInit(): void {
    this.shuffle();
  }

  yes(): void {
    this.router.navigate(['yay']);
  }

  no(): void {
    if (this.nos() < noTexts.length - 1) {
      this.nos.update(value => value + 1);
    }

    this.shuffle();
  }

  private shuffle(): void {
    if (this.seen().length === images.length) {
      this.seen.set([]);
    }
    
    let newImage = images[Math.floor(Math.random() * images.length)];

    while(this.seen().includes(newImage)) {
      newImage = images[Math.floor(Math.random() * images.length)];
    }

    this.src.set(newImage);
    this.seen.update(value => [ ...value, newImage ]);
  }
}
