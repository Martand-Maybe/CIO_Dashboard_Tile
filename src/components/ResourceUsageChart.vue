<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'ResourceUsageChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['CPU', 'Memory', 'Disk I/O', 'Network', 'Cache'],
        datasets: [
          {
            label: 'Usage',
            data: [65, 78, 45, 32, 85],
            backgroundColor: [
              '#50e3c2',
              '#63b3ed',
              '#f6ad55',
              '#fc8181',
              '#9f7aea'
            ],
            borderColor: [
              '#50e3c2',
              '#63b3ed',
              '#f6ad55',
              '#fc8181',
              '#9f7aea'
            ],
            borderWidth: 1
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
          },
          tooltip: {
            backgroundColor: '#242526',
            titleColor: '#e4e6eb',
            bodyColor: '#e4e6eb',
            borderColor: '#3a3b3c',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#3a3b3c'
            },
            ticks: {
              color: '#b0b3b8'
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: '#3a3b3c'
            },
            ticks: {
              color: '#b0b3b8',
              callback: function(value) {
                return value + '%';
              }
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