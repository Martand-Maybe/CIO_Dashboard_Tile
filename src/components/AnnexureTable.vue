<template>
  <div class="annexure-table-card">
    <div class="annexure-table-header">
      <h2>{{ title }}</h2>
      <div class="annexure-table-filters">
        <button :class="['filter-btn', { active: filter === 'All' }]" @click="setFilter('All')">All</button>
        <button :class="['filter-btn', { active: filter === 'P1' }]" @click="setFilter('P1')">P1</button>
        <button :class="['filter-btn', { active: filter === 'P2' }]" @click="setFilter('P2')">P2</button>
      </div>
    </div>
    <div class="annexure-table-search">
      <input v-model="search" placeholder="Search incidents..." />
    </div>
    <div class="annexure-table-scroll">
      <table class="annexure-table">
        <thead>
          <tr>
            <th v-for="key in visibleKeys" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in filteredRows" :key="idx">
            <td v-for="key in visibleKeys" :key="key">
              <template v-if="isPriority(key, row[key])">
                <span :class="['pill', row[key] === 'P1' ? 'pill-p1' : 'pill-p2']">{{ row[key] }}</span>
              </template>
              <template v-else-if="isStatus(key, row[key])">
                <span :class="['pill', statusClass(row[key])]">{{ row[key] }}</span>
              </template>
              <template v-else>
                <span v-html="row[key]"></span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="annexure-table-actions">
      <button class="action-btn"><span class="icon-eye"></span> Show Incident Profile for Component</button>
      <button class="action-btn"><span class="icon-mail"></span> Generate Communications to SDM</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnexureTable',
  props: {
    data: { type: Array, required: true },
    title: { type: String, default: 'Open P1 Incidents - Application & Infrastructure Components' }
  },
  data() {
    return {
      search: '',
      filter: 'All',
    };
  },
  computed: {
    visibleKeys() {
      if (!this.data.length) return [];
      return Object.keys(this.data[0]);
    },
    filteredRows() {
      let rows = this.data;
      if (this.filter !== 'All') {
        rows = rows.filter(row => {
          const priorityKey = Object.keys(row).find(k => k.toLowerCase().includes('priority'));
          return priorityKey && row[priorityKey] === this.filter;
        });
      }
      if (this.search) {
        const s = this.search.toLowerCase();
        rows = rows.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(s)));
      }
      return rows;
    },
  },
  methods: {
    setFilter(f) { this.filter = f; },
    isPriority(key, val) {
      return key.toLowerCase().includes('priority') && (val === 'P1' || val === 'P2');
    },
    isStatus(key, val) {
      return key.toLowerCase().includes('status');
    },
    statusClass(val) {
      if (!val) return 'pill-default';
      const v = val.toLowerCase();
      if (v.includes('active')) return 'pill-active';
      if (v.includes('investigation')) return 'pill-investigation';
      return 'pill-default';
    },
  },
};
</script>

<style scoped>
.annexure-table-card {
  background: #232733;
  border-radius: 12px;
  padding: 24px;
  margin: 32px auto;
  max-width: 1100px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
}
.annexure-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.annexure-table-header h2 {
  color: #3fffd8;
  font-size: 1.3rem;
  font-weight: 600;
}
.annexure-table-filters .filter-btn {
  background: #232733;
  color: #3fffd8;
  border: 2px solid #3fffd8;
  border-radius: 8px;
  padding: 6px 18px;
  margin-left: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.annexure-table-filters .filter-btn.active,
.annexure-table-filters .filter-btn:hover {
  background: #3fffd8;
  color: #232733;
}
.annexure-table-search {
  margin-bottom: 12px;
}
.annexure-table-search input {
  width: 100%;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #3fffd8;
  background: #181c23;
  color: #e6e6e6;
  font-size: 1rem;
}
.annexure-table-scroll {
  overflow-x: auto;
  width: 100%;
}
.annexure-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #232733;
  border-radius: 8px;
  overflow: hidden;
}
.annexure-table th, .annexure-table td {
  padding: 12px 16px;
  text-align: left;
}
.annexure-table th {
  background: #232733;
  color: #3fffd8;
  border-bottom: 2px solid #3fffd8;
  font-weight: 600;
}
.annexure-table tr {
  border-bottom: 1px solid #2e3340;
}
.annexure-table tr:last-child {
  border-bottom: none;
}
.annexure-table td {
  color: #e6e6e6;
}
.pill {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 12px;
  font-size: 0.95em;
  font-weight: 600;
  letter-spacing: 0.03em;
}
.pill-p1 {
  background: #232733;
  color: #3fffd8;
  border: 1px solid #3fffd8;
}
.pill-p2 {
  background: #232733;
  color: #ffb347;
  border: 1px solid #ffb347;
}
.pill-active {
  background: #ff3b3b;
  color: #fff;
}
.pill-investigation {
  background: #ffb347;
  color: #232733;
}
.pill-default {
  background: #3a3b3c;
  color: #e4e6eb;
}
.annexure-table-actions {
  margin-top: 18px;
  display: flex;
  gap: 18px;
}
.action-btn {
  background: #232733;
  color: #3fffd8;
  border: 2px solid #3fffd8;
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, color 0.2s;
}
.action-btn:hover {
  background: #3fffd8;
  color: #232733;
}
.icon-eye::before {
  content: '\1F441'; /* 👁️ */
  font-size: 1.1em;
}
.icon-mail::before {
  content: '\2709'; /* ✉️ */
  font-size: 1.1em;
}
</style> 