import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class PreviewRadioComponent implements OnInit {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() { }

  ngOnInit() {
  }

}
