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
    name: 'TopAlertingSitesBar',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: ['NYC-DC1', 'LDN-Edge', 'BOM-Core', 'SGP-Edge', 'FRA-Infra'],
          datasets: [{
            label: 'Alerts',
            data: [12, 8, 6, 4, 3],
            backgroundColor: '#50e3c2'
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: '#b0b3b8'
              },
              grid: {
                color: '#3a3b3c'
              }
            },
            y: {
              ticks: {
                color: '#e4e6eb',
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
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
  