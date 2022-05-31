import { NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
  imports: [
    AgGridModule,
  ],
  exports: [
    AgGridModule,
  ],
})
export class AgGridImportModule {
}
