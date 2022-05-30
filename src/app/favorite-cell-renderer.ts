import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'favorite-cell',
  template: `<fa-icon [icon]="fasHeart" *ngIf="params.value" style="color: red"></fa-icon><fa-icon [icon]="faHeart" *ngIf="!params.value" style="color: orange"></fa-icon>`,
})
export class FavoriteCellRenderer implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  faHeart = faHeart;
  fasHeart = fasHeart;
  value: boolean = false;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
