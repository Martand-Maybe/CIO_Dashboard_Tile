<template>
  <div class="cio-interrogator-layout">
    <header class="cio-header">
      <img src="/logo1.png" alt="Logo" class="logo-img" />
      <div class="chat-tabs">
        <div v-for="(chat, index) in chats" 
             :key="index" 
             :class="['chat-tab', { active: currentChatIndex === index }]"
             @click="switchChat(index)">
          Chat {{ index + 1 }}
          <span class="tab-close" @click.stop="removeChat(index)" title="Close chat">&times;</span>
        </div>
        <button class="new-chat-btn" @click="addNewChat">New Chat</button>
      </div>
    </header>
    <main class="cio-main">
      <router-view :key="currentChatIndex" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'CIOInterrogatorLayout',
  data() {
    return {
      chats: [{ messages: [], uploadedFiles: [] }],
      currentChatIndex: 0
    }
  },
  methods: {
    addNewChat() {
      this.chats.push({ messages: [], uploadedFiles: [] });
      this.currentChatIndex = this.chats.length - 1;
    },
    removeChat(index) {
      if (this.chats.length > 1) {
        this.chats.splice(index, 1);
        if (this.currentChatIndex >= this.chats.length) {
          this.currentChatIndex = this.chats.length - 1;
        }
      }
    },
    switchChat(index) {
      this.currentChatIndex = index;
    }
  },
  provide() {
    return {
      currentChat: () => this.chats[this.currentChatIndex],
      addNewChat: this.addNewChat,
      currentChatIndex: () => this.currentChatIndex
    }
  }
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
  gap: 1rem;
  background-color: #242526;
}

.logo-img {
  height: 40px;
  width: auto;
}

.chat-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  flex-wrap: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #3a3b3c #242526;
  padding-bottom: 4px;
}

.chat-tabs::-webkit-scrollbar {
  height: 4px;
}

.chat-tabs::-webkit-scrollbar-track {
  background: #242526;
}

.chat-tabs::-webkit-scrollbar-thumb {
  background-color: #3a3b3c;
  border-radius: 2px;
}

.chat-tab {
  background-color: #3a3b3c;
  color: #b0b3b8;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  min-width: 100px;
  justify-content: space-between;
}

.chat-tab.active {
  background-color: #50e3c2;
  color: #1a1b1e;
}

.chat-tab:hover {
  background-color: #4a4b4c;
}

.chat-tab.active:hover {
  background-color: #3fcfb2;
}

.tab-close {
  opacity: 0;
  font-size: 1.2rem;
  line-height: 1;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.chat-tab:hover .tab-close {
  opacity: 1;
}

.tab-close:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.new-chat-btn {
  background-color: #50e3c2;
  color: #1a1b1e;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.new-chat-btn:hover {
  background-color: #3a3b3c;
  color: #50e3c2;
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