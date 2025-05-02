<template>
  <div class="chart-container">
    <div class="gauge-wrapper">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="gauge-center">
        <div class="gauge-value">72%</div>
        <div class="gauge-label">Utilization</div>
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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export default {
  name: 'BandwidthUtilizationGauge',
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ['Used', 'Available'],
        datasets: [
          {
            data: [72, 28],
            backgroundColor: [
              '#63b3ed',
              '#3a3b3c'
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
            display: false
          },
          tooltip: {
            enabled: false
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.gauge-wrapper {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

.gauge-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.gauge-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e6eb;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.gauge-label {
  font-size: 0.875rem;
  color: #b0b3b8;
}
</style> 