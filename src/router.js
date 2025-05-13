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
      { path: 'baseline-report', component: BaselineReport }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
