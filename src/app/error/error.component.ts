import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() error: String = '';
  @Output() dismiss: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.dismiss.emit();
  }

}
