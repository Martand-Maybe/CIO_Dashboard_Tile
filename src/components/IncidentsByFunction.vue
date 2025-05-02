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
  name: 'IncidentsByFunction',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [
          'End User Services',
          'Applications',
          'Network',
          'Cloud',
          'Infrastructure',
          'Other'
        ],
        datasets: [{
          label: 'Incidents',
          data: [45, 31, 25, 15, 9, 3],
          backgroundColor: [
            '#50e3c2',
            '#63b3ed',
            '#f6ad55',
            '#ed64a6',
            '#9f7aea',
            '#a0aec0'
          ]
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#e4e6eb',
              boxWidth: 12,
              padding: 10
            }
          }
        },
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
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  background: #1a1b1e;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #3a3b3c;
}
</style>
  