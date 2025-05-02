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
    name: 'QueryVolumeTrend',
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Queries Executed',
            data: [78000, 90000, 85000, 87000, 92000, 70000, 30000],
            borderColor: '#63b3ed',
            backgroundColor: '#63b3ed',
            tension: 0.4,
            fill: false,
            pointRadius: 4
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e4e6eb'
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#b0b3b8' },
              grid: { color: '#2d2f33' }
            },
            y: {
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
  