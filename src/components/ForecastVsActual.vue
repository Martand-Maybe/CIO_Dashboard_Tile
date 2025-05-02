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
    name: 'ForecastVsActual',
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Forecasted',
              data: [1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000],
              borderColor: '#63b3ed',
              backgroundColor: '#63b3ed',
              tension: 0.4,
              pointRadius: 4
            },
            {
              label: 'Actual',
              data: [1180000, 1230000, 1285000, 1320000, 1395000, 1400000, 860000],
              borderColor: '#f6ad55',
              backgroundColor: '#f6ad55',
              tension: 0.4,
              pointRadius: 4
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#e4e6eb' }
            }
          },
          scales: {
            x: {
              ticks: { color: '#b0b3b8' },
              grid: { color: '#2d2f33' }
            },
            y: {
              beginAtZero: true,
              ticks: { color: '#b0b3b8' },
              grid: { color: '#2d2f33' }
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
  