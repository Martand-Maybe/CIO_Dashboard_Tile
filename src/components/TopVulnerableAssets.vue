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
    name: 'TopVulnerableAssets',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [
            'Server-DB01',
            'API-Gateway',
            'Laptop-ENG12',
            'Firewall-01',
            'Web-App-Prod'
          ],
          datasets: [{
            label: 'Vulnerability Count',
            data: [22, 18, 14, 11, 9],
            backgroundColor: '#e53e3e'
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
              ticks: { color: '#b0b3b8' },
              grid: { color: '#2d2f33' }
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
  