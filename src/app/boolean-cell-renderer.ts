import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'boolean-cell',
  template: `<span style="color: green"><fa-icon [icon]="faCheck" *ngIf="params.value"></fa-icon></span>`,
})
export class BooleanCellRenderer implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  faCheck = faCheck;
  value: boolean = false;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
