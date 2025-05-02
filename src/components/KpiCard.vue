<template>
    <div class="kpi-card" :class="theme">
      <h3 class="title">{{ title }}</h3>
      <p class="value">{{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KpiCard',
    props: {
      title: { type: String, required: true },
      value: { type: [String, Number], required: true },
      theme: {
        type: String,
        default: 'default' // available: default, success, danger, info
      }
    }
  }
  </script>
  
  <style scoped>
  .kpi-card {
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    border-left: 5px solid #ccc;
  }
  
  .kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .title {
    font-size: 14px;
    color: #777;
    margin-bottom: 4px;
    text-align: center;
  }
  
  .value {
    font-size: 24px;
    font-weight: 600;
    color: #2f3a4c;
  }
  
  /* Themes */
  .default { border-left-color: #ccc; }
  .success { border-left-color: #2ecc71; }
  .danger  { border-left-color: #e74c3c; }
  .info    { border-left-color: #3498db; }
  </style>
  