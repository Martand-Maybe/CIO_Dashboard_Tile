<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="gauge-center">
      <div class="gauge-value">{{ value }}%</div>
      <div class="gauge-label">Happy Feedback</div>
    </div>
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
  name: 'FeedbackGauge',
  components: { Doughnut },
  data() {
    return {
      value: 92.1,
      chartData: {
        labels: ['Happy', 'Unhappy'],
        datasets: [{
          data: [92.1, 100 - 92.1],
          backgroundColor: ['#50e3c2', '#3a3b3c'],
          borderWidth: 0,
          circumference: 180,
          rotation: -90,
          cutout: '70%'
        }]
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
          tooltip: { enabled: false }
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
  position: relative;
}

.gauge-center {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.gauge-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e4e6eb;
}

.gauge-label {
  font-size: 0.875rem;
  color: #b0b3b8;
  margin-top: 0.25rem;
}
</style>
  