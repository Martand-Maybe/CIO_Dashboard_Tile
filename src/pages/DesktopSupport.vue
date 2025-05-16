<template>
  <div class="desktop-support-page">
    <div class="dashboard-header">
      <h1 class="page-title">Desktop Support</h1>
    </div>
    <div class="tiles-row">
      <div
        v-for="(tile, idx) in tiles"
        :key="tile.title"
        class="tile"
        :class="{ active: selectedTile === idx }"
        @click="handleTileClick(idx)"
      >
        <span class="tile-title">{{ tile.title }}</span>
        <div class="kpi-number">{{ tile.value }}</div>
      </div>
    </div>
    <div v-if="selectedTile !== null" class="prompts-section">
      <h2 class="prompts-title">Prompts</h2>
      <div class="prompts-buttons">
        <button
          v-for="(prompt, pidx) in tiles[selectedTile].prompts"
          :key="pidx"
          class="prompt-btn"
          @click="handlePromptClick(prompt)"
        >
          {{ prompt }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesktopSupport',
  data() {
    return {
      selectedTile: null,
      cioWindow: null,
      tiles: [
        {
          title: 'Active High-Priority Unresolved Tickets',
          value: 12,
          prompts: [
            'What is the current count and status of active high-priority tickets right now?',
            'Show me a summary of high-priority tickets opened in the last 24 hours.',
            'What were the key high-priority tickets resolved yesterday, and what was their impact?',
            'Are there any high-priority tickets currently breaching their SLA, or close to breaching?',
            'Provide the trend of new vs. resolved high-priority tickets over the past 24-48 hours.'
          ]
        },
        {
          title: 'Active Unresolved Tickets from Partner profiles',
          value: 8,
          prompts: [
            'What is the current number of active unresolved tickets from partner profiles?',
            'List the partner-profile tickets that were opened or updated in the last 24 hours.',
            'Were there any critical partner-profile tickets resolved yesterday?',
            'Show the aging of currently open partner-profile tickets (e.g., <24hrs, 24-48hrs, >48hrs).',
            'What is the immediate outlook for resolving the oldest active partner tickets today?'
          ]
        },
        {
          title: 'Laptop Dispatch Status',
          value: 3,
          prompts: [
            'How many laptops were dispatched yesterday, and how many are scheduled for dispatch today?',
            'What is the current number of new hires (started in the last 7 days) awaiting laptops?',
            'Are there any delays reported in the laptop dispatch process in the last 24 hours?',
            'What was the average dispatch time for laptops fulfilled yesterday?',
            'Can you provide the real-time status for laptop dispatches to associates who joined this week?'
          ]
        }
      ]
    };
  },
  methods: {
    handleTileClick(idx) {
      this.selectedTile = this.selectedTile === idx ? null : idx;
    },
    handlePromptClick(prompt) {
      this.$router.push({
        path: '/cio-interrogator',
        query: { prefill: prompt, newChat: true }
      });
    },
    clearChatMemory() {
      localStorage.removeItem('cio-chat-state');
      this.$toast && this.$toast('Chat memory cleared!', { type: 'success' });
    }
  },
  beforeUnmount() {
    // Clean up window reference if component is destroyed
    this.cioWindow = null;
  }
};
</script>

<style scoped>
.desktop-support-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #e4e6eb;
}
.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #3fffd8;
  margin-bottom: 2rem;
  text-align: center;
}
.tiles-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: nowrap;
  padding: 0 1rem;
}
.tile {
  background: rgba(30, 32, 40, 0.7);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  min-width: 180px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  color: #e4e6eb;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.18);
  flex: 1;
  max-width: 280px;
  position: relative;
  transition: box-shadow 0.2s, background 0.2s, border 0.2s, color 0.2s;
  overflow: hidden;
}
.tile:nth-child(1)::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #ff4d4f99 0%, #ff4d4f33 50%, transparent 100%);
  opacity: 0.7;
  z-index: 0;
  pointer-events: none;
  filter: blur(1.2px);
}
.tile:nth-child(2)::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #ffc53d99 0%, #ffc53d33 50%, transparent 100%);
  opacity: 0.7;
  z-index: 0;
  pointer-events: none;
  filter: blur(1.2px);
}
.tile:nth-child(3)::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #52c41a99 0%, #52c41a33 50%, transparent 100%);
  opacity: 0.7;
  z-index: 0;
  pointer-events: none;
  filter: blur(1.2px);
}
.tile.active, .tile:hover {
  background: rgba(40, 44, 60, 0.92);
  color: #fff;
}
.tile.active:nth-child(1), .tile:hover:nth-child(1) {
  box-shadow: 0 0 32px 4px #ff4d4faa, 0 2px 24px 0 rgba(0,0,0,0.22);
  border: 1.5px solid #ff4d4faa;
}
.tile.active:nth-child(2), .tile:hover:nth-child(2) {
  box-shadow: 0 0 32px 4px #ffc53daa, 0 2px 24px 0 rgba(0,0,0,0.22);
  border: 1.5px solid #ffc53daa;
}
.tile.active:nth-child(3), .tile:hover:nth-child(3) {
  box-shadow: 0 0 32px 4px #52c41aaa, 0 2px 24px 0 rgba(0,0,0,0.22);
  border: 1.5px solid #52c41aaa;
}
.kpi-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 16px rgba(0,0,0,0.18), 0 0 8px rgba(63,255,216,0.10);
  z-index: 1;
}
.tile-title {
  text-align: center;
  width: 100%;
  z-index: 1;
  position: relative;
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.tile-desc {
  display: none;
}
.prompts-section {
  background: #232733;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
}
.prompts-title {
  color: #3fffd8;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.prompts-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}
.prompt-btn {
  background: rgba(40,44,60,0.85);
  color: #e4e6eb;
  border: 1px solid rgba(63,255,216,0.3);
  border-radius: 8px;
  padding: 0.75rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  text-align: left;
  box-shadow: 0 1px 6px rgba(0,0,0,0.10);
}
.prompt-btn:hover {
  background: rgba(63,255,216,0.1);
  color: #3fffd8;
  border-color: rgba(63,255,216,0.5);
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.clear-chat-btn {
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}
.clear-chat-btn:hover {
  background: #d9363e;
}
.clear-chat-btn .material-icons {
  font-size: 20px;
}
</style> 