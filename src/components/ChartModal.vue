<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-box">
        <slot></slot>
        <button class="close-button" @click="close">✖</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChartModal',
    emits: ['close'],
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-box {
    background: #1a1b1e;
    padding: 2rem;
    border-radius: 12px;
    width: 90vw;
    height: 90vh;
    position: relative;
    border: 1px solid #50e3c2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-box > * {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #e53e3e;
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    flex-shrink: 0;
  }
  </style>
  