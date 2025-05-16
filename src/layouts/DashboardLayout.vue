<template>
    <div class="dashboard-layout">
      <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
        <div class="sidebar-header">
          <img :src="isCollapsed ? '/logo2.png' : '/logo1.png'" :alt="isCollapsed ? 'Logo' : 'Full Logo'" class="logo-img" />
          <button class="collapse-btn" @click="toggleSidebar">
            <span class="material-icons">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
          </button>
        </div>
        <nav>
          <router-link to="/desktop-support" class="nav-link">
            <span class="material-icons">computer</span>
            <span class="nav-text">Desktop Support</span>
          </router-link>
          <router-link to="/cost-controls" class="nav-link">
            <span class="material-icons">savings</span>
            <span class="nav-text">Cost Controls</span>
          </router-link>
          <router-link to="/app-support-internal" class="nav-link">
            <span class="material-icons">build</span>
            <span class="nav-text">App Support - I&E</span>
          </router-link>
          <router-link to="/network-ops" class="nav-link">
            <span class="material-icons">router</span>
            <span class="nav-text">Network Ops</span>
          </router-link>
          <router-link to="/information-security" class="nav-link">
            <span class="material-icons">security</span>
            <span class="nav-text">Information Security</span>
          </router-link>
          <router-link to="/cloud-infra-ops" class="nav-link">
            <span class="material-icons">cloud</span>
            <span class="nav-text">Cloud Infra Ops</span>
          </router-link>
          <router-link to="/cio-interrogator" class="nav-link cio-interrogator-link">
            <span class="material-icons">chat</span>
            <span class="nav-text">CIO Interrogator</span>
          </router-link>
        </nav>
      </aside>
  
      <main class="main-content">
        <header class="dashboard-header">
          <h1>IT Service Desk Dashboard</h1>
          <p class="updated">Last updated: 5/2/2025</p>
          <div class="auth-section">
            <button v-if="!isAuthenticated" @click="loginWithRedirect">Login</button>
            <div v-else class="user-info">
              <span class="welcome-message">Welcome {{ user.nickname || user.name || user.email }}.</span>
              <img :src="user.picture" alt="profile" class="user-avatar" />
              <button @click="logout({ logoutParams: { returnTo: window.location.origin + '/login' } })">Logout</button>
            </div>
          </div>
          <button class="clear-chat-storage-btn" @click="clearChatStorage">Clear Chat Storage</button>
        </header>
  
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    name: 'DashboardLayout',
    data() {
      return {
        isCollapsed: false
      }
    },
    setup() {
      const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
      return { loginWithRedirect, logout, isAuthenticated, isLoading, user };
    },
    methods: {
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed
      },
      openCIOInterrogator() {
        window.open('/cio-interrogator', '_blank');
      },
      clearChatStorage() {
        localStorage.removeItem('cio-chat-state');
        this.$toast && this.$toast('Chat memory cleared!', { type: 'success' });
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-layout {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
    background-color: #1a1b1e;
    overflow: hidden;
    color: #e4e6eb;
  }
  
  .sidebar {
    width: 260px;
    background-color: #242526;
    color: #e4e6eb;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    border-right: 1px solid #3a3b3c;
  }
  
  .sidebar.collapsed {
    width: 80px;
  }
  
  .sidebar-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #3a3b3c;
  }
  
  .logo-img {
    height: 40px;
    width: auto;
    transition: all 0.3s ease;
  }
  
  .collapse-btn {
    background: none;
    border: none;
    color: #e4e6eb;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .collapse-btn:hover {
    background-color: #3a3b3c;
  }
  
  .sidebar nav {
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #e4e6eb;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s;
    gap: 1rem;
  }
  
  .nav-link:hover {
    background-color: #3a3b3c;
  }
  
  .nav-link.router-link-active {
    background-color: #50e3c2;
    color: #1a1b1e;
  }
  
  .nav-text {
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .sidebar.collapsed .nav-text {
    opacity: 0;
    width: 0;
  }
  
  .material-icons {
    font-size: 20px;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    min-width: 0;
    width: 100%;
    background-color: #1a1b1e;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 1rem;
    background-color: #242526;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #3a3b3c;
  }
  
  .dashboard-header h1 {
    font-size: 24px;
    color: #e4e6eb;
    margin: 0;
  }
  
  .updated {
    font-size: 14px;
    color: #b0b3b8;
  }
  
  .auth-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-name {
    color: #e4e6eb;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .welcome-message {
    color: #50e3c2;
    font-size: 1.1rem;
    font-weight: 600;
    margin-right: 0.75rem;
  }
  
  .cio-interrogator-link {
    margin-top: 1.5rem;
    background-color: #50e3c2;
    color: #1a1b1e;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .cio-interrogator-link:hover {
    background-color: #3fcfb2;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .clear-chat-storage-btn {
    background-color: #50e3c2;
    color: #1a1b1e;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .clear-chat-storage-btn:hover {
    background-color: #3fcfb2;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      z-index: 1000;
      height: 100vh;
      left: 0;
      top: 0;
    }
    
    .sidebar.collapsed {
      transform: translateX(-100%);
    }

    .main-content {
      padding: 1rem;
    }
  }
  </style>
  