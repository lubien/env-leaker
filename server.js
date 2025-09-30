const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to display environment variables
app.get('/', (req, res) => {
  const envVars = process.env;

  // Sort environment variables alphabetically
  const sortedEnvVars = Object.keys(envVars)
    .sort()
    .reduce((acc, key) => {
      acc[key] = envVars[key];
      return acc;
    }, {});

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environment Variables</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #1a1a2e;
            color: #eee;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            color: #fff;
            margin-bottom: 10px;
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .subtitle {
            text-align: center;
            color: #888;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }

        .env-count {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px 20px;
            background-color: #16213e;
            border-radius: 8px;
            display: inline-block;
            left: 50%;
            transform: translateX(-50%);
            position: relative;
        }

        .env-grid {
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        }

        .env-item {
            background-color: #0f3460;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #1e5f8e;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .env-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(30, 95, 142, 0.4);
            border-color: #2d7ab8;
        }

        .env-key {
            font-weight: bold;
            color: #4fbdba;
            margin-bottom: 8px;
            font-size: 1.1rem;
            word-break: break-all;
        }

        .env-value {
            color: #aaa;
            background-color: #0a1929;
            padding: 10px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            word-break: break-all;
            overflow-x: auto;
            max-height: 200px;
            overflow-y: auto;
        }

        .env-value::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        .env-value::-webkit-scrollbar-track {
            background: #0a1929;
        }

        .env-value::-webkit-scrollbar-thumb {
            background: #1e5f8e;
            border-radius: 4px;
        }

        .env-value::-webkit-scrollbar-thumb:hover {
            background: #2d7ab8;
        }

        @media (max-width: 768px) {
            .env-grid {
                grid-template-columns: 1fr;
            }

            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Environment Variables</h1>
        <p class="subtitle">All environment variables available to this Node.js process</p>
        <div class="env-count">Total: ${Object.keys(sortedEnvVars).length} variables</div>

        <div class="env-grid">
            ${Object.entries(sortedEnvVars).map(([key, value]) => `
                <div class="env-item">
                    <div class="env-key">${escapeHtml(key)}</div>
                    <div class="env-value">${escapeHtml(value)}</div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
  `;

  res.send(html);
});

// Route to get environment variables as JSON
app.get('/json', (req, res) => {
  const envVars = process.env;

  // Sort environment variables alphabetically
  const sortedEnvVars = Object.keys(envVars)
    .sort()
    .reduce((acc, key) => {
      acc[key] = envVars[key];
      return acc;
    }, {});

  res.json({
    count: Object.keys(sortedEnvVars).length,
    variables: sortedEnvVars
  });
});

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Start the server
app.listen(port, () => {
  console.log(`🚀 Environment variable viewer running at http://localhost:${port}`);
  console.log(`📊 JSON API available at http://localhost:${port}/json`);
});
