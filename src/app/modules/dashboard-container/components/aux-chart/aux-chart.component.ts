import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

declare var ApexCharts: any;

@Component({
  selector: 'app-aux-chart',
  templateUrl: './aux-chart.component.html',
  styleUrl: './aux-chart.component.scss'
})
export class AuxChartComponent implements OnInit{

  private isBrowser: boolean;

  constructor( @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined' && this.isBrowser) {
      const chart = new ApexCharts(document.getElementById("pie-chart"), this.getChartOptions());
      chart.render();
    }
  }

  public getChartOptions = () => {
    return {
      series: [52.8, 26.8, 20.4],
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: "113%",
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Hallowen", "Black friday", "Dia sin IVA"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: '50%',
        },
      },
      xaxis: {
        labels: {
          formatter: '50%'
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  }

}
