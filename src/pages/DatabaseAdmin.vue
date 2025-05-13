<template>
  <div class="database-admin">
      <div class="dashboard-header">
      <h1 class="main-title">Database Admin Dashboard</h1>
        <div class="last-updated">Last updated: {{ new Date().toLocaleString() }}</div>
      </div>
  
      <div class="dashboard-grid">
      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">📊</span>
          Database KPIs
        </h2>
        <div class="kpi-row">
          <KpiCard title="DB Uptime" :value="'99.97%'" theme="success" />
          <KpiCard title="Query Performance" :value="'1.8s'" theme="success" />
          <KpiCard title="Backup Success Rate" :value="'98.9%'" theme="success" />
          <KpiCard title="DB Storage Utilization" :value="'83%'" theme="info" />
          <KpiCard title="Top Alerting DB" :value="'Oracle – HRMS'" theme="default" />
        </div>
      </section>

        <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">🕹️</span>
          Controllers
        </h2>
        <div class="controller-row">
          <button class="controller-btn" @click="backupNow">Backup Now</button>
          <button class="controller-btn" @click="runHealthCheck">Run Health Check</button>
          <button class="controller-btn" @click="clearAlerts">Clear Alerts</button>
          </div>
        </section>
  
        <section class="dashboard-section full-width">
        <h2 class="section-title"><span class="icon">📈</span> Database Analytics</h2>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'dbUptime'">
            <DBUptimeTrendChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'queryPerformance'">
            <QueryPerformanceTrendChart />
            </div>
          <div class="chart-container clickable" @click="showModal = 'backupSuccess'">
            <BackupSuccessRateTrendChart />
            </div>
          <div class="chart-container clickable" @click="showModal = 'storageUtilization'">
            <StorageUtilizationGauge />
          </div>
          <div class="chart-container clickable" @click="showModal = 'topAlertingDB'">
            <TopAlertingDBPieChart />
            </div>
          </div>
        </section>
  
      <ChartModal v-if="showModal === 'dbUptime'" @close="showModal = null">
        <DBUptimeTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'queryPerformance'" @close="showModal = null">
        <QueryPerformanceTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'backupSuccess'" @close="showModal = null">
        <BackupSuccessRateTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'storageUtilization'" @close="showModal = null">
        <StorageUtilizationGauge />
      </ChartModal>
      <ChartModal v-if="showModal === 'topAlertingDB'" @close="showModal = null">
        <TopAlertingDBPieChart />
      </ChartModal>
      </div>
    </div>
  </template>
  
  <script>
  import KpiCard from '../components/KpiCard.vue'
import QueryPerformanceChart from '../components/QueryPerformanceChart.vue'
import ResourceUsageChart from '../components/ResourceUsageChart.vue'
import ErrorDistributionChart from '../components/ErrorDistributionChart.vue'
import ReplicationStatusGauge from '../components/ReplicationStatusGauge.vue'
import ChartModal from '../components/ChartModal.vue'
import DBUptimeTrendChart from '../components/DBUptimeTrendChart.vue'
import QueryPerformanceTrendChart from '../components/QueryPerformanceTrendChart.vue'
import BackupSuccessRateTrendChart from '../components/BackupSuccessRateTrendChart.vue'
import StorageUtilizationGauge from '../components/StorageUtilizationGauge.vue'
import TopAlertingDBPieChart from '../components/TopAlertingDBPieChart.vue'
  
  export default {
    name: 'DatabaseAdmin',
    components: {
    KpiCard,
    QueryPerformanceChart,
    ResourceUsageChart,
    ErrorDistributionChart,
    ReplicationStatusGauge,
    ChartModal,
    DBUptimeTrendChart,
    QueryPerformanceTrendChart,
    BackupSuccessRateTrendChart,
    StorageUtilizationGauge,
    TopAlertingDBPieChart
    },
    data() {
      return {
      showModal: null
      }
    },
    methods: {
    backupNow() {
      this.$toast && this.$toast('Backup started!');
    },
    runHealthCheck() {
      this.$toast && this.$toast('Health check running...');
    },
    clearAlerts() {
      this.$toast && this.$toast('Alerts cleared!');
      }
    }
  }
  </script>
  
  <style scoped>
.database-admin {
    min-height: 100vh;
    background: #1a1b1e;
    padding: 1.5rem;
  }
  
  .dashboard-header {
    margin-bottom: 1.5rem;
    text-align: center;
    padding: 1rem;
    background: #242526;
  backdrop-filter: blur(10px);
    border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    border: 1px solid #3a3b3c;
  }
  
  .main-title {
    font-size: 2rem;
    font-weight: 800;
    color: #e4e6eb;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #50e3c2 0%, #2b6cb0 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  }
  
  .last-updated {
    color: #b0b3b8;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .dashboard-grid {
    display: grid;
    gap: 1.25rem;
    max-width: 1800px;
    margin: 0 auto;
  }
  
  .dashboard-section {
    background: #242526;
    border-radius: 12px;
    padding: 1.25rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
    border: 1px solid #3a3b3c;
  }
  
  .dashboard-section:hover {
    transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  border-color: #50e3c2;
  }
  
.dashboard-section.full-width {
    grid-column: 1 / -1;
  }
  
  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #e4e6eb;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  padding-bottom: 0.5rem;
    border-bottom: 1px solid #3a3b3c;
  }
  
  .icon {
    font-size: 1.25rem;
    background: linear-gradient(135deg, #50e3c2 0%, #2b6cb0 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
  
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.chart-container {
  background: #1a1b1e;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #3a3b3c;
  min-height: 250px;
  height: 250px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.chart-container > * {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.chart-container:hover {
  border-color: #50e3c2;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.controller-row {
    display: flex;
    gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
  }
  
.controller-btn {
  background: linear-gradient(90deg, #50e3c2 0%, #2b6cb0 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  transition: background 0.2s, transform 0.2s;
}

.controller-btn:hover {
  background: linear-gradient(90deg, #2b6cb0 0%, #50e3c2 100%);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .database-admin {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.75rem;
  }
  
  .dashboard-section {
    padding: 1rem;
  }
  
  .dashboard-header {
    padding: 1rem;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1600px) {
  .chart-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  }
  </style>
  