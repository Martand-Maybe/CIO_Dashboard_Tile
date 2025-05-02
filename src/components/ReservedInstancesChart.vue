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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export default {
  name: 'ReservedInstancesChart',
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ['Unused (₹3.1L)', 'Used (₹8.9L)'],
        datasets: [
          {
            data: [3.1, 8.9],
            backgroundColor: [
              '#fc8181',
              '#50e3c2'
            ],
            borderColor: '#1a1b1e',
            borderWidth: 2
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
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: ₹${value}L (${percentage}%)`;
              }
            }
          }
        },
        cutout: '70%'
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