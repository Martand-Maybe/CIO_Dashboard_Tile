<template>
  <div class="cybersecurity-dashboard">
    <div class="dashboard-header">
      <h1 class="main-title">Cybersecurity Dashboard</h1>
      <div class="last-updated">Last updated: {{ new Date().toLocaleString() }}</div>
    </div>

    <div class="dashboard-grid">
      <section class="dashboard-section">
        <h2 class="section-title">Key Metrics</h2>
        <div class="kpi-row">
          <KpiCard title="Critical Incidents" :value="'1 (Phishing)'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="Patch Compliance" :value="'92.5%'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="Endpoint Threats Detected" :value="'34'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="SIEM Alert Volume" :value="'820'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="MFA Adoption Rate" :value="'99.4%'">
            <template #status><span class="status-indicator green"></span></template>
          </KpiCard>
        </div>
      </section>

      <section class="dashboard-section full-width">
        <h2 class="section-title">Cybersecurity Analytics</h2>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'incidentsTrend'">
            <div class="chart-title">Critical Incidents Trend</div>
            <CriticalIncidentsTrendChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'patchCompliance'">
            <div class="chart-title">Patch Compliance Trend</div>
            <PatchComplianceTrendChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'endpointThreats'">
            <div class="chart-title">Endpoint Threats</div>
            <EndpointThreatsBarChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'sIEMAlertVolume'">
            <div class="chart-title">SIEM Alert Volume</div>
            <SIEMAlertVolumeChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'mfaAdoption'">
            <div class="chart-title">MFA Adoption</div>
            <MFAAdoptionGauge />
          </div>
        </div>
      </section>

      <ChartModal v-if="showModal === 'incidentsTrend'" @close="showModal = null">
        <div class="chart-title">Critical Incidents Trend</div>
        <CriticalIncidentsTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'patchCompliance'" @close="showModal = null">
        <div class="chart-title">Patch Compliance Trend</div>
        <PatchComplianceTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'endpointThreats'" @close="showModal = null">
        <div class="chart-title">Endpoint Threats</div>
        <EndpointThreatsBarChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'sIEMAlertVolume'" @close="showModal = null">
        <div class="chart-title">SIEM Alert Volume</div>
        <SIEMAlertVolumeChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'mfaAdoption'" @close="showModal = null">
        <div class="chart-title">MFA Adoption</div>
        <MFAAdoptionGauge />
      </ChartModal>
    </div>
  </div>
</template>

<script>
import KpiCard from '../components/KpiCard.vue'
import CriticalIncidentsTrendChart from '../components/CriticalIncidentsTrendChart.vue'
import PatchComplianceTrendChart from '../components/PatchComplianceTrendChart.vue'
import EndpointThreatsBarChart from '../components/EndpointThreatsBarChart.vue'
import SIEMAlertVolumeChart from '../components/SIEMAlertVolumeChart.vue'
import MFAAdoptionGauge from '../components/MFAAdoptionGauge.vue'
import ChartModal from '../components/ChartModal.vue'

export default {
  name: 'CybersecurityDashboard',
  components: {
    KpiCard,
    CriticalIncidentsTrendChart,
    PatchComplianceTrendChart,
    EndpointThreatsBarChart,
    SIEMAlertVolumeChart,
    MFAAdoptionGauge,
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
.cybersecurity-dashboard {
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

.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.status-indicator {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: 0.5rem;
  vertical-align: middle;
  border: 2px solid #222;
}
.status-indicator.green {
  background: #50e3c2;
  box-shadow: 0 0 4px #50e3c2;
}
.status-indicator.yellow {
  background: #f6ad55;
  box-shadow: 0 0 4px #f6ad55;
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
  .cybersecurity-dashboard {
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
  