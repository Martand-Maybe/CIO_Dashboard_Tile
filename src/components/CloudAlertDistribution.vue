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
    name: 'CloudAlertDistribution',
    components: { Pie },
    data() {
      return {
        chartData: {
          labels: ['Critical', 'Warning', 'Info'],
          datasets: [{
            label: 'Alerts',
            data: [1, 4, 2],
            backgroundColor: ['#e53e3e', '#ecc94b', '#4299e1'],
            borderWidth: 1
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
    height: 250px;
  }
  </style>
  