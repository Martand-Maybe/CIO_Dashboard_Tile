<template>
    <div class="cio-interrogator">
      <aside class="sidebar">
        <div class="sidebar-content">
          <button class="new-chat-btn" @click="handleNewChat">New Chat</button>
          <div class="prompts-section">
            <div class="prompts-title">Prompts</div>
            <div v-for="(category, idx) in promptCategories" :key="idx" class="prompt-category">
              <div class="category-title">
                <span v-if="category.icon" class="category-icon" v-html="category.icon"></span>
                {{ category.name }}
              </div>
              <div class="prompt-list">
                <button v-for="(prompt, pidx) in category.prompts" :key="pidx" class="prompt-btn main-prompt-btn" @click="usePrompt(prompt.main)">
                  {{ prompt.main }}
                </button>
              </div>
            </div>
          </div>
          <div class="chat-history">
            <!-- Removed previous chat items -->
          </div>
        </div>
      </aside>
  
      <div class="chat-main">
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(message, index) in messages" 
               :key="index" 
               :class="['message', `${message.type}-message`]">
            <div class="message-content">
              <AnnexureTable
                v-if="message.content === '__ANNEXURE_TABLE__' && lastAnnexureData"
                :data="lastAnnexureData"
                :title="lastAnnexureTitle"
              />
              <div v-else-if="message.content === '__ANNEXURE_TABLE__' && lastAnnexureSections">
                <AnnexureTable
                  v-for="section in lastAnnexureSections"
                  :key="section.section"
                  :data="section.arr"
                  :title="section.section"
                />
              </div>
              <div v-else v-html="message.content"></div>
            </div>
            <div v-if="message.type === 'assistant' && getFollowUpsForMessage(message) && getFollowUpsForMessage(message).length" class="followup-bar">
              <button v-for="(followup, fidx) in getFollowUpsForMessage(message)" :key="fidx" class="followup-btn" @click="usePrompt(followup)">
                {{ followup }}
              </button>
            </div>
          </div>
          <div v-if="isLoading" class="message assistant-message">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Chat Input Bar -->
        <div class="chat-input-bar">
          <label class="file-upload-btn">
            <input type="file" multiple style="display: none;" @change="handleFileUpload" />
            <span class="material-icons">attach_file</span>
          </label>
  
          <input
            type="text"
            v-model="userInput"
            placeholder="Type your message here..."
            class="chat-text-input"
            @keyup.enter="sendMessage"
          />
  
          <button class="send-btn" @click="sendMessage" :disabled="isLoading">
            <span class="material-icons">send</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { processQuery } from '../services/openRouterService';
  import mammoth from 'mammoth';
  import * as pdfjsLib from 'pdfjs-dist/build/pdf';
  import AnnexureTable from '../components/AnnexureTable.vue';
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.js';
  
  export default {
    name: 'CioInterrogator',
    components: { AnnexureTable },
    inject: ['currentChat', 'addNewChat', 'currentChatIndex'],
    data() {
      return {
        userInput: '',
        isLoading: false,
        promptCategories: [
          {
            name: 'System Health & Performance',
            color: 'green',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43d675" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
            prompts: [
              {
                main: 'Which Application/ Infra components are reporting open P1 incidents currently',
                annexure: 'Annexure 2',
                subPrompts: [
                  'Show the Incident profile for the Application/Components (P1/P2 with ageing)',
                  'Generate communications to SDM to provide an ETA on incident'
                ]
              },
              {
                main: 'Show the open P1s from network ops (network segments, devices, and connections)',
                annexure: 'Annexure 1',
                subPrompts: [
                  'Double click on failures in the past 180 days for <component>',
                  'Generate communications to SDM to provide an RCA on incident'
                ]
              },
              {
                main: 'Network performance report in the past 24 hours – bandwidth utilization, network latency, network uptime report',
                annexure: 'Annexure 1',
                subPrompts: [
                  'Show P1 tickets mapped to incident'
                ]
              },
              {
                main: 'Application/Infra monitoring and listing of components where monitoring > thresholds, past 24 hours',
                annexure: 'Annexure 2',
                subPrompts: [
                  'Show P1 tickets mapped to incident'
                ]
              }
            ]
          },
          {
            name: 'Alerting & Incident Management',
            color: 'yellow',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f6c343" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
            prompts: [
              {
                main: 'P1 desktop incidents ageing > 7 days',
                annexure: 'Annexure 3',
                subPrompts: []
              },
              {
                main: 'P1 desktop incidents with Partner profile, ageing > 1 day',
                annexure: 'Annexure 3',
                subPrompts: [
                  'P1 desktop incidents with Executive management profile, ageing > 1 day',
                  'Generate communications to SDM to provide an ETA on Partner profile P1, ageing > 1 day'
                ]
              }
            ]
          },
          {
            name: 'Deployment & Change Management',
            color: 'orange',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f6ad43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`,
            prompts: [
              {
                main: 'Change report to cover key events in the past week. Listing',
                annexure: 'Annexure 4',
                subPrompts: [
                  'Any P1 incidents from the applications for which changes were pushed last week'
                ]
              }
            ]
          },
          {
            name: 'Security & Compliance',
            color: 'red',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc4343" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            prompts: [
              {
                main: 'Number of Unpatched Critical Vulnerabilities mapped to apps/infra components',
                annexure: 'Annexure 5',
                subPrompts: [
                  'Items out of ETA/delays from the above list with assigned owners'
                ]
              }
            ]
          },
          {
            name: 'Resourcing and Costs',
            color: 'blue',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43a1fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/><path d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6"/></svg>`,
            prompts: [
              {
                main: 'Cloud line items showing anomalous increases/decreases in the past monthly statement',
                annexure: 'Dashboard or billing data',
                subPrompts: [
                  'Double click on details'
                ]
              }
            ]
          }
        ],
        followUpSuggestions: {
          'System Health & Performance': [
            'Show me all P1 incidents this week',
            'List components with repeated failures',
            'Show network uptime trend'
          ],
          'Alerting & Incident Management': [
            'Show all open P2 incidents',
            'List incidents by partner',
            'Show incident resolution times'
          ],
          'Deployment & Change Management': [
            'Show all changes in the last month',
            'List failed deployments',
            'Show deployment success rate'
          ],
          'Security & Compliance': [
            'List all open vulnerabilities',
            'Show compliance status by app',
            'Show patching status'
          ]
        },
        lastAnnexureData: null,
        lastAnnexureTitle: '',
        lastAnnexureSections: null,
      };
    },
    computed: {
      messages: {
        get() {
          return this.currentChat().messages;
        },
        set(value) {
          this.currentChat().messages = value;
        }
      },
      uploadedFiles: {
        get() {
          return this.currentChat().uploadedFiles;
        },
        set(value) {
          this.currentChat().uploadedFiles = value;
        }
      }
    },
    methods: {
      usePrompt(text) {
        this.userInput = text;
        // Do not send the message automatically
      },
      scrollToBottom() {
        if (this.$refs.messagesContainer) {
          setTimeout(() => {
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
          }, 100);
        }
      },
      handleNewChat() {
        this.addNewChat();
      },
      async handleFileUpload(event) {
        const files = Array.from(event.target.files);
        this.uploadedFiles = [];
        for (const file of files) {
          let content = '';
          try {
            if (file.type.startsWith('text/')) {
              content = await this.readFileContent(file);
            } else if (file.name.endsWith('.docx')) {
              content = await this.readDocxFile(file);
            } else if (file.name.endsWith('.pdf')) {
              content = await this.readPdfFile(file);
            } else {
              this.messages.push({
                type: 'error',
                content: `File "${file.name}" is not a supported file type. Please upload .txt, .md, .csv, .json, .docx, or .pdf files only.`
              });
              continue;
            }
            this.uploadedFiles.push({
              name: file.name,
              content: content
            });
            this.messages.push({
              type: 'system',
              content: `File "${file.name}" uploaded successfully.`
            });
          } catch (error) {
            console.error(`Error reading file ${file.name}:`, error);
            this.messages.push({
              type: 'error',
              content: `Error reading file "${file.name}". Please try again.`
            });
          }
        }
      },
      
      readFileContent(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
        });
      },
      
      async readDocxFile(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const arrayBuffer = e.target.result;
              const result = await mammoth.extractRawText({ arrayBuffer });
              resolve(result.value);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = (e) => reject(e);
          reader.readAsArrayBuffer(file);
        });
      },
      
      async readPdfFile(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const typedArray = new Uint8Array(e.target.result);
              const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
              let text = '';
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + '\n';
              }
              resolve(text);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = (e) => reject(e);
          reader.readAsArrayBuffer(file);
        });
      },
      
      jsonToTable(jsonData) {
        if (!jsonData || typeof jsonData !== 'object') return '<em>No data</em>';

        const keys = Object.keys(jsonData);
        const maxLength = Math.max(...keys.map(k => Array.isArray(jsonData[k]) ? jsonData[k].length : 0));

        const thead = `<thead><tr>${keys.map(k => `<th>${k}</th>`).join('')}</tr></thead>`;

        const tbody = `<tbody>${Array.from({ length: maxLength }).map((_, idx) => {
          return `<tr>${keys.map(k => {
            let entry = jsonData[k]?.[idx];
            // Render pills for Priority and Status
            if (k.toLowerCase().includes('priority') && entry) {
              const pillClass = entry === 'P1' ? 'pill pill-p1' : 'pill pill-p2';
              return `<td><span class="${pillClass}">${entry}</span></td>`;
            }
            if (k.toLowerCase().includes('status') && entry) {
              let pillClass = 'pill';
              if (entry.toLowerCase().includes('active')) pillClass += ' pill-active';
              else if (entry.toLowerCase().includes('investigation')) pillClass += ' pill-investigation';
              else pillClass += ' pill-default';
              return `<td><span class="${pillClass}">${entry}</span></td>`;
            }
            return `<td>${this.stringifySummary(entry)}</td>`;
          }).join('')}</tr>`;
        }).join('')}</tbody>`;

        return `<div class='annexure-table-scroll'><table class='annexure-table'>${thead}${tbody}</table></div>`;
      },
      
      stringifySummary(value) {
        if (!value) return '';
        if (typeof value === 'object') {
          const summary = Object.entries(value)
            .map(([key, val]) => `${key}: ${val}`)
            .join('<br>');
          return `<div class="cell-object-summary">${summary}</div>`;
        }
        return String(value);
      },
      
      async sendMessage() {
        if (!this.userInput.trim()) return;
        
        const userMessage = this.userInput.trim();
        this.messages.push({
          type: 'user',
          content: userMessage
        });
        this.scrollToBottom();
        
        this.isLoading = true;
        this.userInput = '';
        
        const annexureMap = {
          'Which Application/ Infra components are reporting open P1 incidents currently': '/annexures/annexure6.json',
          'Show the open P1s from network ops (network segments, devices, and connections)': '/annexures/annexure7.json',
          'Network performance report in the past 24 hours – bandwidth utilization, network latency, network uptime report': '/annexures/annexure1.json',
          'Application/Infra monitoring and listing of components where monitoring > thresholds, past 24 hours': '/annexures/annexure2.json',
          'P1 desktop incidents ageing > 7 days': '/annexures/annexure3.json',
          'Change report to cover key events in the past week. Listing': '/annexures/annexure4.json',
          'Number of Unpatched Critical Vulnerabilities mapped to apps/infra components': '/annexures/annexure5.json',
        };
        
        if (annexureMap[userMessage]) {
          try {
            const res = await fetch(annexureMap[userMessage]);
            if (!res.ok) throw new Error('Failed to fetch annexure');
            let data = await res.json();
            if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
              this.lastAnnexureData = data;
              this.lastAnnexureTitle = userMessage;
              this.lastAnnexureSections = null;
              this.messages.push({
                type: 'assistant',
                content: '__ANNEXURE_TABLE__'
              });
              this.scrollToBottom();
            } else if (data && typeof data === 'object' && Object.values(data).every(v => Array.isArray(v))) {
              // Object with sections (each value is an array)
              this.lastAnnexureData = null;
              this.lastAnnexureTitle = userMessage;
              this.lastAnnexureSections = Object.entries(data).map(([section, arr]) => ({ section, arr }));
              this.messages.push({
                type: 'assistant',
                content: '__ANNEXURE_TABLE__'
              });
              this.scrollToBottom();
            } else {
              let content = this.jsonToTable(data);
              this.messages.push({
                type: 'assistant',
                content
              });
              this.scrollToBottom();
            }
          } catch (error) {
            this.messages.push({
              type: 'error',
              content: error.message
            });
            this.scrollToBottom();
          } finally {
            this.isLoading = false;
          }
          return;
        }
        
        try {
          const response = await processQuery(userMessage, this.uploadedFiles);
          this.messages.push({
            type: 'assistant',
            content: response
          });
          this.scrollToBottom();
        } catch (error) {
          this.messages.push({
            type: 'error',
            content: error.message
          });
          this.scrollToBottom();
        } finally {
          this.isLoading = false;
        }
      },
      getFollowUpsForMessage(message) {
        // Find the last used prompt category for this message
        // For demo, use the first category if not found
        let lastCategory = this.promptCategories[0].name;
        // Try to infer category from previous user message
        for (let i = this.messages.indexOf(message) - 1; i >= 0; i--) {
          if (this.messages[i].type === 'user') {
            for (const cat of this.promptCategories) {
              for (const prompt of cat.prompts) {
                if (this.messages[i].content && this.messages[i].content.startsWith(prompt.main.slice(0, 10))) {
                  lastCategory = cat.name;
                  break;
                }
              }
            }
            break;
          }
        }
        return this.followUpSuggestions[lastCategory] || [];
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  
  .cio-interrogator {
    display: flex;
    height: 100vh;
    background-color: #1a1b1e;
    color: #e4e6eb;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .sidebar {
    width: 260px;
    background-color: #242526;
    border-right: 1px solid #3a3b3c;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: hidden;
  }
  
  .new-chat-btn {
    background-color: #50e3c2;
    color: #1a1b1e;
    border: none;
    border-radius: 8px;
    padding: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .new-chat-btn:hover {
    background-color: #3a3b3c;
  }
  
  .prompts-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    max-height: 70vh;
    scrollbar-width: thin;
    scrollbar-color: #3a3b3c #1a1b1e;
  }
  
  .prompts-section::-webkit-scrollbar {
    width: 6px;
  }
  
  .prompts-section::-webkit-scrollbar-thumb {
    background: #3a3b3c;
    border-radius: 4px;
  }
  
  .prompts-section::-webkit-scrollbar-track {
    background: #1a1b1e;
  }
  
  .prompts-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .prompt-category {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .category-title {
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .prompt-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .prompt-btn {
    background-color: #3a3b3c;
    color: #e4e6eb;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .prompt-btn:hover {
    background-color: #4a4b4c;
  }
  
  .chat-history {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .chat-item {
    padding: 0.5rem;
    border-radius: 8px;
    background-color: #3a3b3c;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .chat-item:hover {
    background-color: #4a4b4c;
  }
  
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    height: 100vh;
    overflow: hidden;
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 150px; /* Increased padding at bottom to ensure messages don't hide behind input */
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: #3a3b3c #1a1b1e;
  }
  
  .chat-messages::-webkit-scrollbar {
    width: 8px;
  }
  
  .chat-messages::-webkit-scrollbar-track {
    background: #1a1b1e;
  }
  
  .chat-messages::-webkit-scrollbar-thumb {
    background-color: #3a3b3c;
    border-radius: 4px;
  }
  
  .message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin-bottom: 1rem;
  }
  
  .user-message {
    align-self: flex-end;
    background-color: #50e3c2;
    color: #1a1b1e;
    border-radius: 12px 12px 0 12px;
    padding: 0.75rem;
  }
  
  .assistant-message {
    align-self: flex-start;
    background-color: #3a3b3c;
    border-radius: 12px 12px 12px 0;
    padding: 0.75rem;
  }
  
  .system-message {
    align-self: center;
    background-color: #242526;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    color: #b0b3b8;
  }
  
  .error-message {
    align-self: center;
    background-color: #fc8181;
    color: #1a1b1e;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
  }
  
  .message-content {
    white-space: nowrap;
    word-break: break-word;
  }
  
  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: 4px 8px;
  }
  
  .typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: #50e3c2;
    border-radius: 50%;
    animation: typing 1s infinite;
  }
  
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  
  .chat-input-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid #3a3b3c;
    background: #1a1b1e;
    position: fixed;
    bottom: 0;
    left: 260px; /* Width of sidebar */
    right: 0;
    z-index: 10;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
  }
  
  .chat-text-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #3a3b3c;
    border-radius: 8px;
    background-color: #242526;
    color: #e4e6eb;
    margin-right: 0.5rem;
    outline: none;
  }
  
  .file-upload-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #50e3c2;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #50e3c2;
    color: #1a1b1e;
    border: none;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .send-btn:disabled {
    background-color: #3a3b3c;
    cursor: not-allowed;
  }
  
  .send-btn:hover:not(:disabled) {
    background-color: #3a3b3c;
    color: #50e3c2;
  }
  
  .material-icons {
    font-size: 20px;
  }
  
  .followup-bar {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
  .followup-btn {
    background: #242526;
    color: #b0b3b8;
    border: none;
    border-radius: 6px;
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .followup-btn:hover {
    background: #3a3b3c;
    color: #50e3c2;
  }
  
  .annexure-table-scroll {
    overflow: auto;
    width: 100%;
    display: block;
    border: 2px dashed #50e3c2;
  }
  
  .annexure-table {
    table-layout: auto;
    width: auto;
    min-width: max-content;
    max-width: unset;
    border-collapse: separate;
    border-spacing: 0;
    background: #232733;
    color: #e4e6eb;
    font-size: 1rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    border-radius: 12px;
  }
  
  .annexure-table th,
  .annexure-table td {
    border: 1px solid #35363a;
    padding: 1rem 1.5rem;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    /* word-break: break-word; */
    max-width: 300px;
  }
  
  .annexure-table td {
    min-width: 200px;
    max-width: 400px;
  }
  
  .cell-object-summary {
    white-space: pre-wrap;
    line-height: 1.5;
    font-size: 0.95rem;
  }
  
  /* Assistant message content area must allow horizontal scrolling */
  .assistant-message .message-content {
    max-height: 500px;
    overflow-x: auto !important;
    overflow-y: auto;
    padding-bottom: 0.5rem;
    background: transparent;
    border-radius: 8px;
    display: block;
    width: auto;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  /* Add horizontal scroll for wide tables */
  .assistant-message .message-content {
    overflow-x: auto;
  }
  
  .annexure-table th {
    background: #232733;
    color: #3fffd8;
    border-bottom: 2px solid #3fffd8;
    font-weight: 600;
    font-size: 1.05rem;
  }

  .annexure-table tr {
    border-bottom: 1px solid #2e3340;
  }

  .annexure-table tr:last-child {
    border-bottom: none;
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
  </style>
  