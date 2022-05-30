import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-detail-cell-renderer',
  styleUrls: ['./detail-cell-renderer.scss'],
  templateUrl: `./detail-cell-renderer.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  description?: string;
  when?: string;
  where?: string;
  forWho?: string;

  constructor(private cd: ChangeDetectorRef) {
  }
  agInit(params: any): void {
    this.description = params.data.description;
    this.when = params.data.when;
    this.where = params.data.where;
    this.forWho = params.data.forWho;
    this.cd.markForCheck();
  }

  refresh(params: any): boolean {
    return true;
  }
}
