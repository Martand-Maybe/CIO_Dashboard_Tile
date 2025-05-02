<template>
    <div class="chart-container">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'SitesWithAlertsPie',
    components: { Pie },
    data() {
      return {
        chartData: {
          labels: ['NYC-DC1', 'LDN-Edge', 'BOM-Core', 'SGP-Edge', 'FRA-Infra', 'Others'],
          datasets: [{
            label: 'Sites with Alerts',
            data: [4, 2, 1, 1, 1, 1],
            backgroundColor: [
              '#50e3c2',
              '#63b3ed',
              '#f6ad55',
              '#ed64a6',
              '#9f7aea',
              '#a0aec0'
            ],
            borderWidth: 1,
            borderColor: '#3a3b3c'
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#e4e6eb',
                font: {
                  size: 12
                }
              }
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
    background: #1a1b1e;
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid #3a3b3c;
  }
  </style>
