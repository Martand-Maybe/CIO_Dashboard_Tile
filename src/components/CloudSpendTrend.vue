<template>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)
  
  export default {
    name: 'CloudSpendTrend',
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Cloud Spend ($)',
            data: [280000, 320000, 310000, 290000, 330000, 365000, 20500],
            fill: false,
            borderColor: '#50e3c2',
            backgroundColor: '#50e3c2',
            tension: 0.3,
            pointRadius: 5
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#e4e6eb'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#b0b3b8'
              },
              grid: {
                color: '#2d2f33'
              }
            },
            y: {
              ticks: {
                color: '#b0b3b8'
              },
              grid: {
                color: '#2d2f33'
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
  