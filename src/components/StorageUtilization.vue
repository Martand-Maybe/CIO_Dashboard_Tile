<template>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'StorageUtilization',
    components: { Doughnut },
    data() {
      return {
        chartData: {
          labels: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Others'],
          datasets: [{
            label: 'Storage Used (GB)',
            data: [420, 310, 180, 95, 60],
            backgroundColor: [
              '#48bb78',  // PostgreSQL
              '#63b3ed',  // MySQL
              '#f6ad55',  // MongoDB
              '#ed64a6',  // Redis
              '#a0aec0'   // Others
            ],
            borderWidth: 1
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#e4e6eb',
                font: { size: 12 }
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
  