import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  @Output() addTool = new EventEmitter<string>();
  tools = [
    {name: 'text', display: 'Text'},
    {name: 'checkbox', display: 'Checkbox'},
    {name: 'select', display: 'Dropdown'},
    {name: 'radio', display: 'Radio'},
    {name: 'boolean', display: 'Toggle'}
  ];

  constructor() { }

  add(tool: string) {
    this.addTool.emit(tool);
  }
}
