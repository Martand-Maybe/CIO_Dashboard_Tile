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
          System KPIs
        </h2>
        <div class="kpi-row">
          <KpiCard title="DB Instances" :value="68" class="kpi-card" />
          <KpiCard title="Replication" :value="'98.7%'" class="kpi-card" />
          <KpiCard title="Query Errors" :value="41" class="kpi-card" />
          <KpiCard title="Avg Query Time" :value="'128ms'" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">⚡</span>
          Performance
        </h2>
        <div class="kpi-row">
          <KpiCard title="CPU Usage" :value="'45%'" class="kpi-card" />
          <KpiCard title="Memory Usage" :value="'62%'" class="kpi-card" />
          <KpiCard title="Disk I/O" :value="'78%'" class="kpi-card" />
          <KpiCard title="Network" :value="'35%'" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          Maintenance
        </h2>
        <div class="kpi-row">
          <KpiCard title="Backups" :value="'4/5'" class="kpi-card" />
          <KpiCard title="Updates" :value="'2'" class="kpi-card" />
          <KpiCard title="Patches" :value="'3'" class="kpi-card" />
          <KpiCard title="Health" :value="'98%'" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section full-width">
        <h2 class="section-title"><span class="icon">📈</span> Database Analytics</h2>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'queryPerformance'">
            <QueryPerformanceChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'resourceUsage'">
            <ResourceUsageChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'errorDistribution'">
            <ErrorDistributionChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'replicationStatus'">
            <ReplicationStatusGauge />
          </div>
        </div>
      </section>

      <ChartModal v-if="showModal === 'queryPerformance'" @close="showModal = null">
        <QueryPerformanceChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'resourceUsage'" @close="showModal = null">
        <ResourceUsageChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'errorDistribution'" @close="showModal = null">
        <ErrorDistributionChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'replicationStatus'" @close="showModal = null">
        <ReplicationStatusGauge />
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

export default {
  name: 'DatabaseAdmin',
  components: {
    KpiCard,
    QueryPerformanceChart,
    ResourceUsageChart,
    ErrorDistributionChart,
    ReplicationStatusGauge,
    ChartModal
  },
  data() {
    return {
      showModal: null
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
  