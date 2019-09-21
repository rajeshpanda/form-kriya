import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class PreviewTextComponent implements OnInit {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() { }

  ngOnInit() {
  }

}
