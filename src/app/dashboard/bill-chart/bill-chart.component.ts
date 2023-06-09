import { AfterViewInit, Component, OnChanges,SimpleChanges } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import { EventEmitter } from 'events';
import { Output } from '@angular/compiler/src/core';
import { BillPreviewComponent } from '../bill-preview/bill-preview.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

declare var require: any;
const data: any = require('../../shared/data/chartist.json');
import * as chartsData from '../../shared/data/chartjs';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  colors: string[],
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[],
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels,
  stroke: ApexStroke,
  grid: ApexGrid,
  legend?: ApexLegend,
  tooltip?: ApexTooltip,
  plotOptions?: ApexPlotOptions,
  labels?: string[],
  fill: ApexFill,
  markers?: ApexMarkers,
  theme: ApexTheme,
  responsive: ApexResponsive[]
};


var $info = "#33CC33",
$info_light = "#FF6666"
var themeColors = [$info, $info_light];



export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}



@Component({
  selector: 'app-bill-chart',
  templateUrl: './bill-chart.component.html',
  styleUrls: ['./bill-chart.component.scss']
})

export class BillChartComponent implements AfterViewInit {
  columnChartOptions : Partial<ChartOptions>;
  puntero: any = 0;
  tipoFactura: any = 0;
  series: any = 0;

  
  ngAfterViewInit(): void {
    
    
    
  }
  
  ngOnInit(): void {
    const ingreso: any[] = [300, 200, 80, 190, 320, 145,130, 180,300, 200, 80, 190]; 
    const salida: any[] = [100, 300, 200, 120, 130, 140, 150, 160,100, 300, 200, 120];

    this.columnChartOptions = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: true
      },
        animations: {
          enabled: true
        },
        events:{
          dataPointSelection: (event:any,chartContext:any, config:any)=>{
              this.updateSelected(config);
              console.log("puntero es: ", config)
              console.log("contexto del grafico: ", chartContext)
              console.log("evento: ", event)
          }
        }
      },
      colors: themeColors,
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '65%',
        },
      },
      grid: {
        borderColor: "#BDBDBD44"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent']
      },
      series: [{
        name: 'Entra',
        data: ingreso
      }, {
        name: 'Sale',
        data: salida
      }],
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
        axisBorder: {
          color: "#BDBDBD44"
        }
      },
      tooltip:{
        y: {
          formatter: function (val) {
            return "$" + val + " thousands"
          }
        } 
      }
    }
    
  } 
  
  updateSelected=(index :any)=>{
    console.log("funciono el evento")
    this.puntero = index.dataPointIndex;
    this.tipoFactura = index.seriesIndex;
    this.series = index.w.globals.series[this.tipoFactura][this.puntero]
  }

  
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;





  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };
}
