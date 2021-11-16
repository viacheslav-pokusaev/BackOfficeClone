import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { GridOptions, IDatasource } from 'ag-grid';
import { RestInterface } from '../../interfaces/rest.interface';
import { BaseQueryModel } from '../../models/query-models/base-query.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { SPINNER_CONFIG } from '../../constants/constants';

@Component({
  selector: 'app-ag-grid-helper',
  templateUrl: './ag-grid-helper.component.html'
})
export class AgGridHelperComponent implements OnInit,AfterViewInit {

  public gridOptions: GridOptions;
  public dataSource: IDatasource;
  private isInit:boolean = false;
  private _columnDefs:Array<object>;
  private _service:RestInterface<any,any>;
  private _queryModel:any;
  loading = false;

  spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

  @Input('columnDefs') set columnDefs(value:Array<object>){
    this._columnDefs = value;
    if(!this.isInit && this._columnDefs && 
        this._queryModel && this._service)
      {
        this.initGrid();
      }
  }
  @Input('service') set service(value:RestInterface<any,any>){
    this._service = value;
    if(!this.isInit && this._columnDefs && 
        this._queryModel && this._service)
      {
        this.initGrid();
      }
  }; 
  @Input('queryModel') set queryModel(value:BaseQueryModel<any>){
    this._queryModel = value;
    if(!this.isInit && this._columnDefs && 
        this._queryModel && this._service)
      {
        this.initGrid();
      }
  };  

  constructor() {  
  }

  initGrid(){
    this.isInit = true;
    var that = this;
    this.gridOptions = <GridOptions>{
      datasource: that.dataSource,
      columnDefs: that._columnDefs,
      enableServerSideSorting: true,
      enableServerSideFilter: true,
      animateRows: true,
      enableColResize: true,
      rowSelection: 'single',
      rowDeselection: true,
      rowModelType: 'infinite',          
      pagination: true,
      context: this,
      masterDetail: true,
      paginationPageSize: 10,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 2,
      infiniteInitialRowCount: 1,
      maxBlocksInCache: 1,
      cacheBlockSize: 10,
      rowHeight: 40,
      headerHeight: 30,
      suppressHorizontalScroll: true,   
      detailRowHeight:100,            
      getRowNodeId: function (item) {
          return item.id;
      }, 
      onGridReady: function (params) {
          if (params)
              params.api.sizeColumnsToFit();
      }
  };


    var dataSource = {    
      getRows: function (params: any) {      
        
        that._queryModel.Skip = params.startRow;

        that._queryModel.Take = params.endRow - params.startRow;
        
        if (params.sortModel.length > 0) {
            params.sortModel[0].sort == 'asc' ? that._queryModel.SortBy = params.sortModel[0].colId : that._queryModel.SortDescBy = params.sortModel[0].colId;                   
        }               

        for (let filter in params.filterModel) {
          that._queryModel[filter + "Contain"] = params.filterModel[filter].filter                    
        }
        that._service.get(that._queryModel).subscribe(response => {                   
            var data = response.Result;
            that.loading = false;
            params.successCallback(data, response.TotalCount);
        })
      }
    };

    this.gridOptions.onGridReady = (event: any) => {
        this.gridOptions.api.setDatasource(dataSource);
    }
  }
    ngOnInit() {
      this.loading = true;
    }

    ngAfterViewInit() {
    }


}
