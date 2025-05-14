<template>
    <div class="finops-dashboard">
      <div class="dashboard-header">
        <h1 class="main-title">FinOps Dashboard</h1>
        <div class="last-updated">Last updated: {{ new Date().toLocaleString() }}</div>
      </div>
  
      <div class="dashboard-grid">
        <section class="dashboard-section">
        <h2 class="section-title">Key Metrics</h2>
          <div class="kpi-row">
          <KpiCard title="Monthly Cloud Spend" :value="'₹48.6L'">
            <template #status><span class="status-indicator red"></span></template>
          </KpiCard>
          <KpiCard title="Cost per Application" :value="'₹1.24L'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="Unused Reserved Instances" :value="'₹3.1L'">
            <template #status><span class="status-indicator red"></span></template>
          </KpiCard>
          <KpiCard title="Optimization Opportunities" :value="'9 flagged'">
            <template #status><span class="status-indicator yellow"></span></template>
          </KpiCard>
          <KpiCard title="Budget Utilization" :value="'87%'">
            <template #status><span class="status-indicator green"></span></template>
          </KpiCard>
          </div>
        </section>
  
        <section class="dashboard-section full-width">
        <h2 class="section-title">Cloud Cost Trends</h2>
        <div class="trend-summary-row">
          <div class="trend-summary-card">
            <div class="trend-summary-title">Projected Monthly Cost (Mar 23)</div>
            <div class="trend-summary-value">$1.08M</div>
            <div class="trend-summary-label">(From FY-23)</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Projected Yearly Cost (Mar 23)</div>
            <div class="trend-summary-value">$12.9M</div>
            <div class="trend-summary-label">(From FY-23)</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Average Cost Per Month FY-24</div>
            <div class="trend-summary-value">$909,944</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Actual Cost Total FY-24</div>
            <div class="trend-summary-value">$10,919,336</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">March 2025 Approved Baseline Budget</div>
            <div class="trend-summary-value">$728,129</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Actual March 2025 Invoice</div>
            <div class="trend-summary-value">$734,706</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">FY 25 YTD Actual Spend</div>
            <div class="trend-summary-value">$6.0M</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Projected Cost FY-25</div>
            <div class="trend-summary-value">$8.5M</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Projected Cost FY-26 (Current Env)</div>
            <div class="trend-summary-value">$8.7M</div>
          </div>
          <div class="trend-summary-card">
            <div class="trend-summary-title">Projected Budget FY-26 (12% Growth)</div>
            <div class="trend-summary-value">$9.75M</div>
            </div>
            </div>
        <div class="trend-chart-grid">
          <div class="chart-container clickable" @click="showModal = 'cloudCostTrend'">
            <div class="chart-title">Cloud Cost Actual Invoice Trend FY-23 to FY-25</div>
            <CloudCostTrend />
            <div class="axis-label x-axis">Month</div>
            <div class="axis-label y-axis">Cost (USD)</div>
            </div>
          <div class="chart-container clickable" @click="showModal = 'forecastVsActual'">
            <div class="chart-title">Cloud Cost - Baseline vs Actuals Tracking</div>
            <ForecastVsActual />
            <div class="axis-label x-axis">Month</div>
            <div class="axis-label y-axis">Cost (USD)</div>
          </div>
        </div>
        <ChartModal v-if="showModal === 'cloudCostTrend'" @close="showModal = null">
          <div class="chart-title">Cloud Cost Actual Invoice Trend FY-23 to FY-25</div>
          <CloudCostTrend />
        </ChartModal>
        <ChartModal v-if="showModal === 'forecastVsActual'" @close="showModal = null">
          <div class="chart-title">Cloud Cost - Baseline vs Actuals Tracking</div>
          <ForecastVsActual />
          <div class="trend-note-box">
            <div class="trend-note-title">$88K/month Baseline increase for new business requirements</div>
            <ul class="trend-note-list">
              <li><span class="trend-note-dot"></span> $4K Temporary</li>
              <li><span class="trend-note-dot"></span> $84K Recurring</li>
            </ul>
          </div>
        </ChartModal>
      </section>

      <section class="dashboard-section full-width">
        <h2 class="section-title">FinOps Analytics</h2>
        <div class="chart-grid">
          <div class="chart-container clickable" @click="showModal = 'cloudSpendTrend'">
            <div class="chart-title">Monthly Cloud Spend Trend</div>
            <CloudSpendTrendChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'costPerApp'">
            <div class="chart-title">Cost Per Application</div>
            <CostPerApplicationChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'reservedInstances'">
            <div class="chart-title">Unused Reserved Instances</div>
            <ReservedInstancesChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'optimizationOpps'">
            <div class="chart-title">Optimization Opportunities</div>
            <OptimizationOpportunitiesChart />
          </div>
          <div class="chart-container clickable" @click="showModal = 'budgetUtilization'">
            <div class="chart-title">Budget Utilization</div>
            <BudgetUtilizationGauge />
          </div>
        </div>
      </section>

      <ChartModal v-if="showModal === 'cloudSpendTrend'" @close="showModal = null">
        <div class="chart-title">Monthly Cloud Spend Trend</div>
        <CloudSpendTrendChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'costPerApp'" @close="showModal = null">
        <div class="chart-title">Cost Per Application</div>
        <CostPerApplicationChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'reservedInstances'" @close="showModal = null">
        <div class="chart-title">Unused Reserved Instances</div>
        <ReservedInstancesChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'optimizationOpps'" @close="showModal = null">
        <div class="chart-title">Optimization Opportunities</div>
        <OptimizationOpportunitiesChart />
      </ChartModal>
      <ChartModal v-if="showModal === 'budgetUtilization'" @close="showModal = null">
        <div class="chart-title">Budget Utilization</div>
        <BudgetUtilizationGauge />
        </ChartModal>
      </div>
    </div>
  </template>
  
  <script>
  import KpiCard from '../components/KpiCard.vue'
import CloudSpendTrendChart from '../components/CloudSpendTrendChart.vue'
import CostPerApplicationChart from '../components/CostPerApplicationChart.vue'
import ReservedInstancesChart from '../components/ReservedInstancesChart.vue'
import OptimizationOpportunitiesChart from '../components/OptimizationOpportunitiesChart.vue'
import BudgetUtilizationGauge from '../components/BudgetUtilizationGauge.vue'
  import ChartModal from '../components/ChartModal.vue'
import CloudCostTrend from '../components/CloudCostTrend.vue'
  import ForecastVsActual from '../components/ForecastVsActual.vue'
  
  export default {
  name: 'FinOpsDashboard',
    components: {
      KpiCard,
    CloudSpendTrendChart,
    CostPerApplicationChart,
    ReservedInstancesChart,
    OptimizationOpportunitiesChart,
    BudgetUtilizationGauge,
      ChartModal,
    CloudCostTrend,
    ForecastVsActual
    },
    data() {
      return {
        showModal: null
      }
    }
  }
  </script>
  
  <style scoped>
  .finops-dashboard {
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
.status-indicator.red {
  background: #fc8181;
  box-shadow: 0 0 4px #fc8181;
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
  .finops-dashboard {
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

.trend-summary-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.trend-summary-card {
  background: #232428;
  border-radius: 10px;
  border: 1px solid #3a3b3c;
  padding: 1rem 1.5rem;
  min-width: 180px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.trend-summary-title {
  color: #b0b3b8;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.trend-summary-value {
  color: #50e3c2;
  font-size: 1.2rem;
  font-weight: 700;
}
.trend-summary-label {
  color: #b0b3b8;
  font-size: 0.85rem;
  margin-top: 0.1rem;
  }
.trend-chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.chart-container.clickable {
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
}
.chart-container.clickable:hover {
  border-color: #50e3c2;
  box-shadow: 0 4px 12px -2px #50e3c2;
  transform: translateY(-2px) scale(1.03);
}
@media (max-width: 1200px) {
  .trend-chart-grid {
    grid-template-columns: 1fr;
  }
}
.trend-note-box {
  background: #18191c;
  border-left: 4px solid #50e3c2;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  color: #e4e6eb;
  max-width: 600px;
}
.trend-note-title {
  font-weight: 700;
  color: #50e3c2;
  margin-bottom: 0.5rem;
}
.trend-note-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.trend-note-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #50e3c2;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.chart-title {
  color: #b0b3b8;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
.axis-label {
  color: #b0b3b8;
  font-size: 0.95rem;
  font-weight: 600;
  position: absolute;
  pointer-events: none;
}
.x-axis {
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
}
.y-axis {
  left: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  }
  </style>
  