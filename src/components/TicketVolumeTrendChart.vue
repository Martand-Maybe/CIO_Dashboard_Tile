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
  name: 'TicketVolumeTrendChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Tickets',
            data: [180, 210, 175, 160, 220, 150, 145],
            backgroundColor: '#50e3c2',
            borderRadius: 6,
            maxBarThickness: 32
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#242526',
            titleColor: '#e4e6eb',
            bodyColor: '#e4e6eb',
            borderColor: '#3a3b3c',
            borderWidth: 1
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
            grid: {
              color: '#3a3b3c'
            },
            ticks: {
              color: '#b0b3b8'
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