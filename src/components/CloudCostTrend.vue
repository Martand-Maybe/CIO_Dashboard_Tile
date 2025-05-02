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
  name: 'CloudCostTrend',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Compute',
            backgroundColor: '#50e3c2',
            data: [28.5, 32.1, 29.8, 31.2, 28.5, 30.1]
          },
          {
            label: 'Storage',
            backgroundColor: '#63b3ed',
            data: [12.3, 13.5, 12.8, 13.1, 12.3, 12.9]
          },
          {
            label: 'Network',
            backgroundColor: '#f6ad55',
            data: [4.4, 4.8, 4.5, 4.7, 4.4, 4.6]
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
              color: '#b0b3b8',
              callback: function(value) {
                return '$' + value + 'K';
              }
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