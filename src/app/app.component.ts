import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'RxJS-practice';
  @ViewChild('btn') button: ElementRef;

  ngOnInit(): void {

    const myObserver = {
      next: (x: string) => console.log('Observer got a next value: ' + x),
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    };

    new Observable((observer) => {
      observer.next('A value');
      setTimeout(() => {
        observer.complete();
      }, 2000);
      observer.next('A second value');
    }).subscribe(myObserver);

  }


  ngAfterViewInit(): void {
    const subscription = fromEvent(this.button.nativeElement, 'click')
      .subscribe((event: MouseEvent) => console.log(event.clientX));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);
  }

}
