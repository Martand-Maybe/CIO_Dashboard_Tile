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
    name: 'TopSlowQueries',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [
            'SELECT * FROM orders',
            'JOIN users/products',
            'UPDATE invoices SET...',
            'DELETE FROM logs WHERE...',
            'ALTER TABLE customers'
          ],
          datasets: [{
            label: 'Avg Execution Time (ms)',
            data: [845, 690, 588, 541, 390],
            backgroundColor: '#f56565'
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: '#b0b3b8'
              },
              grid: {
                color: '#2d2f33'
              }
            },
            y: {
              ticks: {
                color: '#e4e6eb',
                font: { weight: 'bold' }
              },
              grid: { display: false }
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
  