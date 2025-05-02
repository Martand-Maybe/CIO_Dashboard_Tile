<template>
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
  
  export default {
    name: 'NetworkAlertsChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Alerts',
              backgroundColor: '#50e3c2',
              data: [9, 17, 24, 19, 31, 14, 37]
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
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
                color: '#3a3b3c'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: '#b0b3b8'
              },
              grid: {
                color: '#3a3b3c'
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
  