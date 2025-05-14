<template>
  <div class="baseline-report-dashboard">
    <div class="dashboard-header">
      <div class="header-main">
        <h1 class="main-title">T&D Infra Scan Report</h1>
        <span class="subtitle">Data Validation in progress</span>
      </div>
      <div class="header-meta">
        <span class="report-date">Baseline Report - Feb 25, 2025</span>
        <span class="source">Source: Qualys Scan Report on 2025/Feb</span>
      </div>
      <div class="tab-filters">
        <button v-for="tab in tabs" :key="tab" :class="['tab-btn', {active: selectedTab === tab}]" @click="selectedTab = tab">{{ tab }}</button>
      </div>
    </div>
    <div class="dashboard-content">
      <aside class="sidebar-filters">
        <div class="filter-section">
          <div class="filter-title">Department</div>
          <input class="filter-search" placeholder="Search" v-model="searchDepartment" />
          <label><input type="checkbox" v-model="selectAllDepartment" @change="toggleSelectAll('department')" /> Select all</label>
          <div class="filter-list">
            <label v-for="item in filteredDepartments" :key="item">
              <input type="checkbox" v-model="selectedDepartments" :value="item" /> {{ item }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-title">App Owner</div>
          <input class="filter-search" placeholder="Search" v-model="searchAppOwner" />
          <label><input type="checkbox" v-model="selectAllAppOwner" @change="toggleSelectAll('appOwner')" /> Select all</label>
          <div class="filter-list">
            <label v-for="item in filteredAppOwners" :key="item">
              <input type="checkbox" v-model="selectedAppOwners" :value="item" /> {{ item }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-title">Environment</div>
          <label><input type="checkbox" v-model="selectAllEnvironment" @change="toggleSelectAll('environment')" /> Select all</label>
          <div class="filter-list">
            <label v-for="item in environments" :key="item">
              <input type="checkbox" v-model="selectedEnvironments" :value="item" /> {{ item }}
            </label>
          </div>
        </div>
      </aside>
      <main class="main-dashboard-area">
        <div class="kpi-row">
          <KpiCard v-for="kpi in kpis" :key="kpi.title" :title="kpi.title" :value="kpi.value" />
        </div>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'remediationTeam'">
            <div class="chart-title">Vulnerabilities by Remediation Team</div>
            <IncidentTypePieChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'topApps'">
            <div class="chart-title">Top 5 Apps with Critical/High</div>
            <TopAlertingSitesBar />
          </div>
          <div class="chart-container clickable" @click="showModal = 'topCategories'">
            <div class="chart-title">Top 5 Categories with Critical/High</div>
            <TopAlertingSitesBar />
          </div>
          <div class="chart-container clickable" @click="showModal = 'openAging'">
            <div class="chart-title">Open Aging</div>
            <VulnerabilityBarChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'vulnByCategory'">
            <div class="chart-title">Vulnerabilities by Category</div>
            <VulnerabilityBarChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'vulnByType'">
            <div class="chart-title">Vulnerabilities by Type</div>
            <ThreatDistributionPie />
          </div>
        </div>
        <ChartModal v-if="showModal === 'remediationTeam'" @close="showModal = null">
          <div class="chart-title">Vulnerabilities by Remediation Team</div>
          <IncidentTypePieChart />
        </ChartModal>
        <ChartModal v-if="showModal === 'topApps'" @close="showModal = null">
          <div class="chart-title">Top 5 Apps with Critical/High</div>
          <TopAlertingSitesBar />
        </ChartModal>
        <ChartModal v-if="showModal === 'topCategories'" @close="showModal = null">
          <div class="chart-title">Top 5 Categories with Critical/High</div>
          <TopAlertingSitesBar />
        </ChartModal>
        <ChartModal v-if="showModal === 'openAging'" @close="showModal = null">
          <div class="chart-title">Open Aging</div>
          <VulnerabilityBarChart />
        </ChartModal>
        <ChartModal v-if="showModal === 'vulnByCategory'" @close="showModal = null">
          <div class="chart-title">Vulnerabilities by Category</div>
          <VulnerabilityBarChart />
        </ChartModal>
        <ChartModal v-if="showModal === 'vulnByType'" @close="showModal = null">
          <div class="chart-title">Vulnerabilities by Type</div>
          <ThreatDistributionPie />
        </ChartModal>
        <div class="footer-links">
          <a href="#" class="footer-link">Vulnerability Details</a>
          <a href="#" class="footer-link">Feedback</a>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import KpiCard from '../components/KpiCard.vue'
import VulnerabilityBarChart from '../components/VulnerabilityBarChart.vue'
import TopAlertingSitesBar from '../components/TopAlertingSitesBar.vue'
import IncidentTypePieChart from '../components/IncidentTypePieChart.vue'
import ThreatDistributionPie from '../components/ThreatDistributionPie.vue'
import ChartModal from '../components/ChartModal.vue'

export default {
  name: 'BaselineReport',
  components: {
    KpiCard,
    VulnerabilityBarChart,
    TopAlertingSitesBar,
    IncidentTypePieChart,
    ThreatDistributionPie,
    ChartModal
  },
  data() {
    return {
      tabs: ['Total', 'Unique', 'Trends', 'Critical Vuln', 'Remediations'],
      selectedTab: 'Total',
      showModal: null,
      kpis: [
        { title: 'Total', value: '2266' },
        { title: 'Unique', value: '472' },
        { title: 'Critical', value: '81' },
        { title: 'High', value: '548' },
        { title: 'Medium', value: '1042' },
        { title: 'Low', value: '519' },
        { title: 'Info', value: '76' }
      ],
      departments: ['Application & Product Engg', 'Infra - AD & PKI - Gap', 'Infra - CloudOps', 'Infra - DBA'],
      appOwners: ['Amit Hansda', 'Jonatan', 'Kanduri Sesahiah', 'Mandar Dakhde', 'Micael George', 'Nagendra Kancharla', 'Nandishwar', 'Nishant Mohapatra'],
      environments: ['DEV', 'Disaster Response(DR)', 'Production', 'STAGE', 'TEST'],
      searchDepartment: '',
      searchAppOwner: '',
      selectedDepartments: [],
      selectedAppOwners: [],
      selectedEnvironments: [],
      selectAllDepartment: false,
      selectAllAppOwner: false,
      selectAllEnvironment: false
    }
  },
  computed: {
    filteredDepartments() {
      return this.departments.filter(d => d.toLowerCase().includes(this.searchDepartment.toLowerCase()));
    },
    filteredAppOwners() {
      return this.appOwners.filter(a => a.toLowerCase().includes(this.searchAppOwner.toLowerCase()));
    }
  },
  methods: {
    toggleSelectAll(type) {
      if (type === 'department') {
        this.selectedDepartments = this.selectAllDepartment ? [...this.departments] : [];
      } else if (type === 'appOwner') {
        this.selectedAppOwners = this.selectAllAppOwner ? [...this.appOwners] : [];
      } else if (type === 'environment') {
        this.selectedEnvironments = this.selectAllEnvironment ? [...this.environments] : [];
      }
    }
  }
}
</script>

<style scoped>
.baseline-report-dashboard {
  min-height: 100vh;
  background: #1a1b1e;
  color: #e4e6eb;
  padding: 1.5rem;
}
.dashboard-header {
  background: #242526;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #3a3b3c;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2);
}
.header-main {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
}
.main-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #50e3c2 0%, #2b6cb0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}
.subtitle {
  color: #fc8181;
  font-size: 1.1rem;
  font-weight: 600;
}
.header-meta {
  margin-top: 0.5rem;
  color: #b0b3b8;
  font-size: 0.95rem;
  display: flex;
  gap: 2rem;
}
.tab-filters {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.tab-btn {
  background: #1a1b1e;
  color: #e4e6eb;
  border: 1px solid #3a3b3c;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tab-btn.active, .tab-btn:hover {
  background: #50e3c2;
  color: #1a1b1e;
}
.dashboard-content {
  display: flex;
  gap: 2rem;
}
.sidebar-filters {
  min-width: 220px;
  background: #232428;
  border-radius: 10px;
  border: 1px solid #3a3b3c;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
}
.filter-section {
  margin-bottom: 1rem;
}
.filter-title {
  color: #50e3c2;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.filter-search {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: 1px solid #3a3b3c;
  background: #1a1b1e;
  color: #e4e6eb;
}
.filter-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.main-dashboard-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}
.chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}
.chart-container {
  background: #1a1b1e;
  border-radius: 8px;
  padding: 1.2rem;
  border: 1px solid #3a3b3c;
  min-height: 340px;
  height: 340px;
  max-height: 400px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-title {
  color: #50e3c2;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
.chart-container > *:not(.chart-title) {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.chart-container.clickable:hover {
  border-color: #50e3c2;
  box-shadow: 0 4px 12px -2px #50e3c2;
  transform: translateY(-2px) scale(1.03);
}
.footer-links {
  margin-top: 1.5rem;
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
}
.footer-link {
  color: #50e3c2;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover {
  color: #2b6cb0;
}
@media (max-width: 1200px) {
  .dashboard-content {
    flex-direction: column;
    gap: 1rem;
  }
  .sidebar-filters {
    flex-direction: row;
    min-width: 0;
    width: 100%;
    gap: 1rem;
  }
  .main-dashboard-area {
    gap: 1rem;
  }
  .chart-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .chart-container {
    min-height: 260px;
    height: 260px;
    max-height: 320px;
    padding: 1.2rem;
  }
  .chart-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style> 