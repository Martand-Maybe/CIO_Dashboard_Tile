<template>
  <div class="service-quality">
    <div class="dashboard-header">
      <h1 class="main-title">Service Quality Dashboard</h1>
      <div class="last-updated">Last updated: {{ new Date().toLocaleString() }}</div>
    </div>

    <div class="dashboard-grid">
      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">📊</span>
          Service KPIs
        </h2>
        <div class="kpi-row">
          <KpiCard title="Total Incidents" :value="42" class="kpi-card" />
          <KpiCard title="Active Incidents" :value="8" class="kpi-card" />
          <KpiCard title="Avg. Resolution Time" :value="'2.5h'" class="kpi-card" />
          <KpiCard title="SLA Compliance" :value="'98.5%'" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          Performance
        </h2>
        <div class="kpi-row">
          <KpiCard title="Response Time" :value="'15m'" class="kpi-card" />
          <KpiCard title="Resolution Time" :value="'2.5h'" class="kpi-card" />
          <KpiCard title="First Contact" :value="'92%'" class="kpi-card" />
          <KpiCard title="Customer Satisfaction" :value="'4.8/5'" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section">
        <h2 class="section-title">
          <span class="icon">📈</span>
          Trends
        </h2>
        <div class="kpi-row">
          <KpiCard title="Incidents (MTD)" :value="42" class="kpi-card" />
          <KpiCard title="Resolved" :value="34" class="kpi-card" />
          <KpiCard title="In Progress" :value="8" class="kpi-card" />
          <KpiCard title="Prevented" :value="15" class="kpi-card" />
        </div>
      </section>

      <section class="dashboard-section full-width">
        <h2 class="section-title"><span class="icon">📊</span> Service Analytics</h2>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'incidentsBar'">
            <IncidentsBarChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'countryContributors'">
            <CountryContributorsPie />
          </div>
          <div class="chart-container clickable" @click="showModal = 'incidentsByFunction'">
            <IncidentsByFunction />
          </div>
          <div class="chart-container clickable" @click="showModal = 'feedbackGauge'">
            <FeedbackGauge />
          </div>
        </div>
      </section>

      <ChartModal v-if="showModal === 'incidentsBar'" @close="showModal = null">
        <IncidentsBarChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'countryContributors'" @close="showModal = null">
        <CountryContributorsPie />
      </ChartModal>
      <ChartModal v-if="showModal === 'incidentsByFunction'" @close="showModal = null">
        <IncidentsByFunction />
      </ChartModal>
      <ChartModal v-if="showModal === 'feedbackGauge'" @close="showModal = null">
        <FeedbackGauge />
      </ChartModal>
    </div>
  </div>
</template>

<script>
import KpiCard from '../components/KpiCard.vue'
import IncidentsBarChart from '../components/IncidentsBarChart.vue'
import CountryContributorsPie from '../components/CountryContributorsPie.vue'
import IncidentsByFunction from '../components/IncidentsByFunction.vue'
import FeedbackGauge from '../components/FeedbackGauge.vue'
import ChartModal from '../components/ChartModal.vue'

export default {
  name: 'ServiceQuality',
  components: {
    KpiCard,
    IncidentsBarChart,
    CountryContributorsPie,
    IncidentsByFunction,
    FeedbackGauge,
    ChartModal
  },
  data() {
    return {
      showModal: null
    };
  }
}
</script>

<style scoped>
.service-quality {
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
  .service-quality {
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
