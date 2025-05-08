<template>
  <div class="service-desk-dashboard">
    <div class="dashboard-header">
      <h1 class="main-title">IT Service Desk Dashboard</h1>
      <div class="last-updated">Last updated: {{ new Date().toLocaleDateString() }}</div>
    </div>

    <div class="kpi-row-horizontal">
      <div class="kpi-card-block">
        <div class="block-title">Current Snapshot</div>
        <div class="kpi-block-row">
          <KpiCard title="Open" :value="'275'" />
          <KpiCard title="Resolved" :value="'60'" />
          <KpiCard title="Active P1/P2" :value="'0'" />
        </div>
      </div>
      <div class="kpi-card-block">
        <div class="block-title">Month to date (MTD)</div>
        <div class="kpi-block-row">
          <KpiCard title="Created" :value="'454'" />
          <KpiCard title="Resolved" :value="'259'" />
          <KpiCard title="MTTR (Days)" :value="'0.07'" />
          <KpiCard title="Response SLA %" :value="'98.1%'" />
          <KpiCard title="Resolution SLA %" :value="'98.5%'" />
        </div>
      </div>
      <div class="kpi-card-block">
        <div class="block-title">Year to date (YTD)</div>
        <div class="kpi-block-row">
          <KpiCard title="Created" :value="'14323'" />
          <KpiCard title="Resolved" :value="'13896'" />
          <KpiCard title="MTTR (Days)" :value="'0.65'" />
          <KpiCard title="Response SLA %" :value="'98.1%'" />
          <KpiCard title="Resolution SLA %" :value="'98.5%'" />
        </div>
      </div>
      <div class="region-filter-card">
        <div class="block-title">Region</div>
        <div class="region-checkboxes">
          <label class="select-all-label">
            <input type="checkbox" :checked="allRegionsSelected" @change="toggleSelectAll" /> Select all
          </label>
          <label v-for="region in regions" :key="region">
            <input type="checkbox" :value="region" :checked="selectedRegions.includes(region)" @change="toggleRegion(region, $event)" /> {{ region }}
          </label>
        </div>
      </div>
    </div>

    <div class="chart-section">
      <div class="chart-row">
        <div class="chart-block wide clickable" @click="showModal = 'incidentsBar'">
          <div class="chart-title">Incidents Created & Resolved</div>
          <IncidentsBarChart />
        </div>
        <div class="chart-block clickable" @click="showModal = 'incidentsByFunction'">
          <div class="chart-title">Incidents by Tech Function (YTD)</div>
          <IncidentsByFunction />
        </div>
      </div>
      <div class="chart-row">
        <div class="chart-block clickable" @click="showModal = 'countryContributors'">
          <div class="chart-title">Top Country contributors</div>
          <CountryContributorsPie />
        </div>
        <div class="chart-block clickable" @click="showModal = 'servicesImpacted'">
          <div class="chart-title">Top Services Impacted</div>
          <ServiceConsumptionPieChart />
        </div>
        <div class="chart-block clickable" @click="showModal = 'feedbackGauge'">
          <div class="chart-title">Incident Feedback - Happy Response</div>
          <FeedbackGauge />
        </div>
      </div>
    </div>

    <!-- Modals for expanded charts -->
    <ChartModal v-if="showModal === 'incidentsBar'" @close="showModal = null">
      <IncidentsBarChart />
    </ChartModal>
    <ChartModal v-if="showModal === 'incidentsByFunction'" @close="showModal = null">
      <IncidentsByFunction />
    </ChartModal>
    <ChartModal v-if="showModal === 'countryContributors'" @close="showModal = null">
      <CountryContributorsPie />
    </ChartModal>
    <ChartModal v-if="showModal === 'servicesImpacted'" @close="showModal = null">
      <ServiceConsumptionPieChart />
    </ChartModal>
    <ChartModal v-if="showModal === 'feedbackGauge'" @close="showModal = null">
      <FeedbackGauge />
    </ChartModal>
  </div>
</template>

<script>
import KpiCard from '../components/KpiCard.vue'
import IncidentsBarChart from '../components/IncidentsBarChart.vue'
import IncidentsByFunction from '../components/IncidentsByFunction.vue'
import CountryContributorsPie from '../components/CountryContributorsPie.vue'
import ServiceConsumptionPieChart from '../components/ServiceConsumptionPieChart.vue'
import FeedbackGauge from '../components/FeedbackGauge.vue'
import ChartModal from '../components/ChartModal.vue'

export default {
  name: 'ServiceDesk',
  components: {
    KpiCard,
    IncidentsBarChart,
    IncidentsByFunction,
    CountryContributorsPie,
    ServiceConsumptionPieChart,
    FeedbackGauge,
    ChartModal
  },
  data() {
    return {
      showModal: null,
      regions: ['Americas', 'APAC', 'EMEA', 'Europe West', 'Global'],
      selectedRegions: ['Americas', 'APAC', 'EMEA', 'Europe West', 'Global']
    }
  },
  computed: {
    allRegionsSelected() {
      return this.selectedRegions.length === this.regions.length;
    }
  },
  methods: {
    toggleSelectAll(e) {
      if (e.target.checked) {
        this.selectedRegions = [...this.regions];
      } else {
        this.selectedRegions = [];
      }
    },
    toggleRegion(region, event) {
      if (event.target.checked) {
        if (!this.selectedRegions.includes(region)) {
          this.selectedRegions = [...this.selectedRegions, region];
        }
      } else {
        this.selectedRegions = this.selectedRegions.filter(r => r !== region);
      }
    }
  }
}
</script>

<style scoped>
.service-desk-dashboard {
  min-height: 100vh;
  background: #1a1b1e;
  padding: 1.5rem;
}

.dashboard-header {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #242526;
  border-radius: 12px;
  border: 1px solid #3a3b3c;
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  color: #e4e6eb;
  background: linear-gradient(90deg, #50e3c2 0%, #2b6cb0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  margin: 0;
}

.last-updated {
  color: #b0b3b8;
  font-size: 0.95rem;
  font-weight: 500;
}

.kpi-row-horizontal {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: stretch;
}
.kpi-card-block {
  background: #242526;
  border-radius: 10px;
  border: 1px solid #3a3b3c;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 220px;
  flex: 1 1 260px;
}
.block-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #50e3c2;
  margin-bottom: 0.5rem;
}
.kpi-block-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.kpi-block-row > * {
  flex: 1 1 0;
  min-width: 100px;
  max-width: 180px;
  display: flex;
  justify-content: center;
}
.region-filter-card {
  background: #242526;
  border-radius: 10px;
  border: 1px solid #3a3b3c;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 160px;
  flex: 0 0 180px;
}
.region-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
.region-checkboxes label {
  color: #e4e6eb;
  font-size: 0.95rem;
}
.select-all-label {
  color: #50e3c2;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.chart-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.chart-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}
.chart-block {
  background: #242526;
  border-radius: 10px;
  border: 1px solid #3a3b3c;
  padding: 1rem;
  flex: 1 1 0;
  min-width: 0;
  min-height: 270px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.chart-block.wide {
  flex: 2 1 0;
}
.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #b0b3b8;
  margin-bottom: 0.5rem;
}

@media (max-width: 1200px) {
  .kpi-row-horizontal {
    flex-direction: column;
    gap: 1rem;
  }
  .kpi-card-block, .region-filter-card {
    width: 100%;
    min-width: 0;
  }
  .kpi-block-row {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style> 