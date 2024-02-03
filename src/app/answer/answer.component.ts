import { Component, OnInit, Signal, signal } from '@angular/core';

const images = [
  '/assets/answer/yay-1.gif',
  '/assets/answer/yay-2.gif',
  '/assets/answer/yay-3.gif',
  '/assets/answer/yay-4.gif',
  '/assets/answer/yay-5.gif',
  '/assets/answer/yay-6.gif',
  '/assets/answer/yay-7.gif',
  '/assets/answer/yay-8.gif',
  '/assets/answer/yay-9.gif',
  '/assets/answer/yay-10.gif',
  '/assets/answer/yay-11.gif',
  '/assets/answer/yay-12.gif',
  '/assets/answer/yay-13.gif',
  '/assets/answer/yay-14.gif',
  '/assets/answer/yay-15.gif',
  '/assets/answer/yay-16.gif',
  '/assets/answer/yay-17.gif',
  '/assets/answer/yay-18.gif',
  '/assets/answer/yay-19.gif',
  '/assets/answer/yay-20.gif',
  '/assets/answer/yay-21.gif',
];

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit {
  readonly src = signal(images[0]);
  readonly seen = signal<string[]>([]);

  ngOnInit(): void {
    this.shuffle();
  }

  shuffle(): void {
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
