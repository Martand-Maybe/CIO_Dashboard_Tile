<template>
  <div class="chart-container">
    <div class="gauge-wrapper">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="gauge-center">
        <div class="gauge-value">{{ value }}%</div>
        <div class="gauge-label">Security Score</div>
      </div>
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
  name: 'SecurityScoreGauge',
  components: { Doughnut },
  data() {
    return {
      value: 92,
      chartData: {
        labels: ['Score', 'Remaining'],
        datasets: [{
          data: [92, 100 - 92],
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
              padding: 10,
              font: {
                size: 11
              }
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

.gauge-wrapper {
  width: 90%;
  height: 100%;
  margin: 0 auto;
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