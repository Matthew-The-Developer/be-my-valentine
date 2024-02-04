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
  'Inconceivable!',
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
  private readonly soonNos = signal<string[]>([]);
  readonly noText = signal<string>('No');

  readonly yesSize: Signal<string> = computed(() => `${1 + this.nos()}rem`);
  
  readonly src = signal(images[0]);
  private readonly seenImages = signal<string[]>([]);

  ngOnInit(): void {
    this.shuffleImage();
  }

  yes(): void {
    this.router.navigate(['yay']);
  }

  no(): void {
    this.nos.update(value => value + 1);
    this.shuffleText();
    this.shuffleImage();
  }

  private shuffleText(): void {
    if (this.soonNos().length === noTexts.length) {
      this.soonNos.set([]);
    }

    let newNo = noTexts[Math.floor(Math.random() * noTexts.length)];

    while(this.soonNos().includes(newNo)) {
      newNo = noTexts[Math.floor(Math.random() * noTexts.length)];
    }

    this.noText.set(newNo);
    this.soonNos.update(value => [ ...value, newNo ]);
  }

  private shuffleImage(): void {
    if (this.seenImages().length === images.length) {
      this.seenImages.set([]);
    }
    
    let newImage = images[Math.floor(Math.random() * images.length)];

    while(this.seenImages().includes(newImage)) {
      newImage = images[Math.floor(Math.random() * images.length)];
    }

    this.src.set(newImage);
    this.seenImages.update(value => [ ...value, newImage ]);
  }
}
