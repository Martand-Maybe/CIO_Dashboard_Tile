<template>
  <div class="network-ops-page">
    <h1 class="page-title" style="text-align: left; margin-bottom: 2rem;">Network Operations</h1>
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
  name: 'NetworkOps',
  data() {
    return {
      selectedTile: null,
      tiles: [
        {
          title: 'Critical Network Device/Link Status',
          value: 4,
          prompts: [
            'What is the real-time operational status (up/down/degraded) of all critical network devices and links?',
            'Were any critical network devices or links reported as down or degraded in the last 24 hours?',
            'If any critical component is currently down, what is its immediate impact and ETA for resolution?',
            'Provide the uptime percentage for our primary internet links as of end-of-day yesterday.',
            'Show any active alerts related to critical network device health.'
          ]
        },
        {
          title: 'Real-time Bandwidth Utilization & Latency',
          value: 2,
          prompts: [
            'What is the current (near real-time) bandwidth utilization on our top 5 most critical network links?',
            'Show the average and peak network latency to key internal and cloud services over the last 24 hours.',
            'Are any network links currently exceeding 80% bandwidth utilization?',
            'What was the maximum latency recorded on the link to [Specific Data Center/Cloud Region] yesterday?',
            'Identify any unusual spikes in bandwidth usage or latency in the past 24 hours.'
          ]
        },
        {
          title: 'Open Incidents',
          value: 6,
          prompts: [
            'What is the current number of P1/P2 network operations incidents?',
            'List network incidents reported in the last 24 hours.',
            'How many network incidents were resolved yesterday?',
            'What is the status of ongoing critical network incidents right now?',
            'Which network services or locations are most impacted by incidents opened today or yesterday?'
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
    }
  }
};
</script>

<style scoped>
.network-ops-page {
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
  gap: 1rem;
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
.tile-title {
  text-align: center;
  width: 100%;
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
.kpi-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 16px rgba(0,0,0,0.18), 0 0 8px rgba(63,255,216,0.10);
  z-index: 1;
}
</style> 