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
  name: 'HighLatencySitesChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Chennai', 'Frankfurt'],
        datasets: [
          {
            label: 'Latency (ms)',
            data: [180, 210],
            backgroundColor: ['#f6ad55', '#fc8181'],
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
                return `${context.label}: ${context.raw} ms`;
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
            min: 0,
            max: 250,
            grid: {
              color: '#3a3b3c'
            },
            ticks: {
              color: '#b0b3b8',
              callback: function(value) {
                return value + ' ms';
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