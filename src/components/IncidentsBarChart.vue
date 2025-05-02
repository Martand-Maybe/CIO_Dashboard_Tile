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
  name: 'IncidentsBarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Critical',
            backgroundColor: '#fc8181',
            data: [5, 7, 3, 4, 6, 2]
          },
          {
            label: 'High',
            backgroundColor: '#f6ad55',
            data: [8, 6, 9, 7, 5, 8]
          },
          {
            label: 'Medium',
            backgroundColor: '#63b3ed',
            data: [12, 10, 8, 11, 9, 7]
          },
          {
            label: 'Low',
            backgroundColor: '#50e3c2',
            data: [15, 12, 14, 10, 13, 11]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
  height: 100%;
  background: #1a1b1e;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #3a3b3c;
}
</style>
  