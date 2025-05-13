<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

export default {
  name: 'CloudCostTrend',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [
          'Jul-23', 'Aug-23', 'Sep-23', 'Oct-23', 'Nov-23', 'Dec-23',
          'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24',
          'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
          'Jan-25', 'Feb-25', 'Mar-25'
        ],
        datasets: [
          {
            label: 'Actual Invoice',
            data: [
              822, 897, 931, 1157, 955, 957, 923, 890, 921, 869, 824, 766,
              641, 637, 624, 664, 697, 727, 666, 734, 734
            ],
            borderColor: '#50e3c2',
            backgroundColor: 'rgba(80, 227, 194, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#50e3c2',
            pointBorderColor: '#fff',
            pointRadius: 4
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
              color: '#b0b3b8',
              maxRotation: 45,
              minRotation: 45
            },
            grid: {
              color: '#3a3b3c'
            }
          },
          y: {
            beginAtZero: false,
            min: 600,
            max: 1300,
            grid: {
              color: '#3a3b3c'
            },
            ticks: {
              color: '#b0b3b8',
              callback: function(value) {
                return '$' + value.toLocaleString() + 'K';
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