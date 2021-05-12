import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const observable = interval(1000);

    const observer = {
      next: (value) => console.log(value)
    };

    const subscription = observable.pipe(map((value) => `Number: ${value}`), throttleTime(1900)).subscribe(observer);

    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

}
