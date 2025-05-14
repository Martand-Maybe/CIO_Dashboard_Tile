// TEMP: Use the new API key from OpenRouterAPI.txt for all environments while debugging Netlify env issues.
const OPENROUTER_API_KEY = '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';
// const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function processQuery(query, fileContents) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your environment variables.');
  }

  try {
    // Prepare the messages array with file contents and query
    const messages = [];
    
    // Add file contents as system messages (truncate to 10,000 chars)
    if (fileContents && fileContents.length > 0) {
      fileContents.forEach(file => {
        let truncatedContent = file.content ? file.content.slice(0, 10000) : '';
        console.log(`File: ${file.name}, Extracted length: ${file.content ? file.content.length : 0}, Sent length: ${truncatedContent.length}`);
        messages.push({
          role: 'system',
          content: `Content of file ${file.name}:\n${truncatedContent}`
        });
      });
    }
    
    // Add the user's query
    messages.push({
      role: 'user',
      content: query
    });

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CIO Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.7-sonnet',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      let errorMsg = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          errorMsg += `: ${errorData.error.message}`;
        } else if (errorData.message) {
          errorMsg += `: ${errorData.message}`;
        }
        console.error('API Error:', errorData);
      } catch (jsonErr) {
        const text = await response.text();
        errorMsg += `: ${text}`;
        console.error('API Error (non-JSON):', text);
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    if (!data.choices || !Array.isArray(data.choices) || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response:', data);
      throw new Error('Unexpected API response: ' + JSON.stringify(data));
    }
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error processing query:', error);
    // Return the error message so it can be shown in the UI
    throw new Error(error.message || 'Unknown error occurred');
  }
} 