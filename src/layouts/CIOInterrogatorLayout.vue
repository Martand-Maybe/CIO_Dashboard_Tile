<template>
  <div class="cio-interrogator-layout">
    <header class="cio-header">
      <img src="/logo1.png" alt="Logo" class="logo-img" />
    </header>
    <main class="cio-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'CIOInterrogatorLayout'
}
</script>

<style scoped>
.cio-interrogator-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1b1e;
  color: #e4e6eb;
  font-family: 'Segoe UI', sans-serif;
}

.cio-header {
  padding: 1rem;
  border-bottom: 1px solid #3a3b3c;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.cio-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style> 