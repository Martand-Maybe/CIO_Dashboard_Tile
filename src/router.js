import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from './layouts/DashboardLayout.vue'
import ServiceQuality from './pages/ServiceQuality.vue'
import Network from './pages/Network.vue' // ⬅️ NEW
import CloudOps from './pages/CloudOps.vue'
import FinOps from './pages/FinOps.vue'
import Cybersecurity from './pages/Cybersecurity.vue'
import DatabaseAdmin from './pages/DatabaseAdmin.vue'
import ServiceDesk from './pages/ServiceDesk.vue'
import Login from './pages/Login.vue'
import BaselineReport from './pages/BaselineReport.vue'
import CIOInterrogatorLayout from './layouts/CIOInterrogatorLayout.vue'
import CioInterrogator from './pages/CioInterrogator.vue'
import DesktopSupport from './pages/DesktopSupport.vue'
import CostControls from './pages/CostControls.vue'
import AppSupportInternal from './pages/AppSupportInternal.vue'
import NetworkOps from './pages/NetworkOps.vue'
import InformationSecurity from './pages/InformationSecurity.vue'
import CloudInfraOps from './pages/CloudInfraOps.vue'
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', component: Login },
      { path: 'service-quality', component: ServiceQuality },
      { path: 'network', component: Network },
      { path: 'cloud-ops', component: CloudOps },
      { path: 'finops', component: FinOps },
      { path: 'cybersecurity', component: Cybersecurity },
      { path: 'database-admin', component: DatabaseAdmin },
      { path: 'service-desk', component: ServiceDesk },
      { path: 'baseline-report', component: BaselineReport },
      { path: 'desktop-support', component: DesktopSupport },
      { path: 'cost-controls', component: CostControls },
      { path: 'app-support-internal', component: AppSupportInternal },
      { path: 'network-ops', component: NetworkOps },
      { path: 'information-security', component: InformationSecurity },
      { path: 'cloud-infra-ops', component: CloudInfraOps }
    ]
  },
  {
    path: '/cio-interrogator',
    component: CIOInterrogatorLayout,
    children: [
      { path: '', component: CioInterrogator }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
