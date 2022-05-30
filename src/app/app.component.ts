import { Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Data, DataItem, Item } from './data.interface';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DetailCellRenderer } from './detail-cell-renderer';
import { BooleanCellRenderer } from './boolean-cell-renderer';
import { FavoriteCellRenderer } from './favorite-cell-renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nerdland-programmatie';
  items?: Item[] = [];
  displayedColumns: string[] = ['title', 'tags'];

  gridOptions: GridOptions = {
    rowGroupPanelShow: 'always',
    columnDefs:  [
      { field: 'title', cellRenderer: 'agGroupCellRenderer' },
      { field: 'type', filter: 'agSetColumnFilter', enableRowGroup: true },
      { field: 'tent', filter: 'agSetColumnFilter', enableRowGroup: true },
      { field: 'friday', cellRenderer: BooleanCellRenderer, headerName: 'FR' },
      { field: 'saturday', cellRenderer: BooleanCellRenderer, headerName: 'SA' },
      { field: 'sunday', cellRenderer: BooleanCellRenderer, headerName: 'SU' },
      { field: 'when' },
      { field: 'forWho', headerName: 'Age' },
      { field: 'favorite', cellRenderer: FavoriteCellRenderer, onCellClicked: (event: CellClickedEvent) => this.toggleFavorite(event) },
    ],
  }

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private appService: AppService) {
    this.fetchData();
  }

  async fetchData() {
    this.items = await this.appService.fetchData();
    setTimeout(() => {
      this.autoSizeAll(false);
    }, 10);
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  detailCellRenderer: any = DetailCellRenderer;
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.agGrid.columnApi.getAllColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.agGrid.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  private toggleFavorite(event: CellClickedEvent) {
    this.appService.toggleFavorite(event.data);
    this.agGrid.api.refreshCells();
  }

  onBtPrinterFriendly() {
    var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
    eGridDiv.style.width = '';
    eGridDiv.style.height = '';
    this.agGrid.api.setDomLayout('print');
  }

  onBtNormal() {
    var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
    eGridDiv.style.width = '100%';
    eGridDiv.style.height = '100%';
    // Same as setting to 'normal' as it is the default
    this.agGrid.api.setDomLayout();
  }

}
