import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  @Input() survey: FormGroup;
  @Output() jsonApply = new EventEmitter<any>();
  code: string;
  constructor() { }

  ngOnInit(): void { }

  init() {
    this.code = JSON.stringify(this.survey.value, null, 2);
  }

  apply() {
    this.jsonApply.emit(JSON.parse(this.code));
  }
}
