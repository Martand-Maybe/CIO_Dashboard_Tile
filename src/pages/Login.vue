<template>
  <div class="login-page">
    <div class="login-content">
      <h2>Welcome to the CIO Dashboard</h2>
      <button @click="loginWithRedirect">Login with Auth0</button>
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

if (!isLoading && isAuthenticated) {
  window.location.href = '/service-desk';
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1b1e;
}
.login-content {
  background: #242526;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-content h2 {
  color: #50e3c2;
  margin-bottom: 1.5rem;
}
.login-content button {
  background: #50e3c2;
  color: #1a1b1e;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-content button:hover {
  background: #2b6cb0;
  color: #fff;
}
</style> 