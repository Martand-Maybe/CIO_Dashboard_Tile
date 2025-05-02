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
    name: 'ThreatCategories',
    components: { Doughnut },
    data() {
      return {
        chartData: {
          labels: [
            'Malware',
            'Phishing',
            'Insider Threat',
            'Credential Theft',
            'Policy Violation'
          ],
          datasets: [{
            data: [12, 9, 8, 11, 7],
            backgroundColor: [
              '#f56565',  // Malware
              '#ecc94b',  // Phishing
              '#4299e1',  // Insider Threat
              '#9f7aea',  // Credential Theft
              '#48bb78'   // Policy Violation
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
  