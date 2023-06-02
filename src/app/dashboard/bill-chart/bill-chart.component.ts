import { Component } from '@angular/core';
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


var $info = "#2F8BE6",
$info_light = "#ACE0FC"
var themeColors = [$info, $info_light];



export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}


let ingreso: any[] = [300, 200, 80, 190, 320, 145,130, 180,300, 200, 80, 190]; 
let salida: any[] = [100, 300, 200, 120, 130, 140, 150, 160,100, 300, 200, 120];

@Component({
  selector: 'app-bill-chart',
  templateUrl: './bill-chart.component.html',
  styleUrls: ['./bill-chart.component.scss']
})

export class BillChartComponent  {
  columnChartOptions : Partial<ChartOptions>;


  constructor(){
    this.columnChartOptions = {
  
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: true
        },
        animations: {
          enabled: true
        }
      },
      colors: themeColors,
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
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
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Feb', 'Mar', 'Apr', 'May'],
        axisBorder: {
          color: "#BDBDBD44"
        }
      },
      tooltip: {
        custom: function({val}) {
          
        },
        y: {
          formatter: function (val) {
            return "$" + val + " thousands"
          }
        }
      }
    }
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
