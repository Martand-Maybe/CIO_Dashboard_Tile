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
    name: 'SavingsByCategory',
    components: { Doughnut },
    data() {
      return {
        chartData: {
          labels: ['Licensing', 'Storage', 'Compute', 'Network', 'Other'],
          datasets: [{
            label: 'Savings ($)',
            data: [400000, 300000, 250000, 150000, 100000],
            backgroundColor: [
              '#48bb78', // Licensing
              '#4299e1', // Storage
              '#f6ad55', // Compute
              '#ed64a6', // Network
              '#a0aec0'  // Other
            ],
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
  