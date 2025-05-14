<template>
    <div class="cio-interrogator">
      <aside class="sidebar">
        <div class="sidebar-content">
          <button class="new-chat-btn" @click="messages = []; uploadedFiles = []">New Chat</button>
          <div class="prompts-section">
            <div class="prompts-title">Prompts</div>
            <div v-for="(category, idx) in promptCategories" :key="idx" class="prompt-category">
              <div class="category-title">
                <span v-if="category.icon" class="category-icon" v-html="category.icon"></span>
                {{ category.name }}
              </div>
              <div class="prompt-list">
                <button v-for="(prompt, pidx) in category.prompts" :key="pidx" class="prompt-btn" @click="usePrompt(prompt)">
                  {{ prompt }}
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
            <div class="message-content" v-html="message.content"></div>
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
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.js';
  
  export default {
    name: 'CioInterrogator',
    data() {
      return {
        userInput: '',
        messages: [],
        uploadedFiles: [],
        isLoading: false,
        promptCategories: [
          {
            name: 'System Health & Performance',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50e3c2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 8 12 12 20 16 4 20 12 20 12" /></svg>`,
            prompts: [
              'Which application or infrastructure components have active P1 incidents today?',
              'Show me P1 and P2 incidents by component with their ageing details.',
              'What network segments had failures in the last 180 days?',
              'Give me the network performance report for the past 24 hours — bandwidth, latency, and uptime.',
              'List all components where monitoring thresholds were breached in the last 24 hours.'
            ]
          },
          {
            name: 'Alerting & Incident Management',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc8181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
            prompts: [
              'Which P1 desktop incidents have been open for more than 7 days?',
              'Give me a breakdown of partner-related desktop P1 incidents pending for more than 1 day.'
            ]
          },
          {
            name: 'Deployment & Change Management',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`,
            prompts: [
              'What were the key change events in the past week and did they trigger any P1 incidents?'
            ]
          },
          {
            name: 'Security & Compliance',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f6ad55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            prompts: [
              'How many critical vulnerabilities are unpatched and what apps/infra are they linked to?',
              'Which vulnerabilities are past their ETA and who is responsible for them?'
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
        }
      };
    },
    methods: {
      usePrompt(prompt) {
        this.userInput = prompt;
        // Do not send the message automatically
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
      
      async sendMessage() {
        if (!this.userInput.trim()) return;
        
        const userMessage = this.userInput.trim();
        this.messages.push({
          type: 'user',
          content: userMessage
        });
        
        this.isLoading = true;
        
        try {
          const response = await processQuery(userMessage, this.uploadedFiles);
          this.messages.push({
            type: 'assistant',
            content: response
          });
        } catch (error) {
          console.error('Error getting response:', error);
          this.messages.push({
            type: 'error',
            content: 'Sorry, there was an error processing your request. Please try again.'
          });
        } finally {
          this.isLoading = false;
          this.userInput = '';
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
                if (this.messages[i].content && this.messages[i].content.startsWith(prompt.slice(0, 10))) {
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
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    white-space: pre-wrap;
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
    position: sticky;
    bottom: 0;
    z-index: 10;
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
  </style>
  