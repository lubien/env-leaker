# Environment Variable Viewer

A simple Node.js Express server that displays all environment variables in a pretty, web-based interface.

## 🚨 Security Warning

**This application exposes ALL environment variables including sensitive data like API keys, passwords, and tokens. Use with caution and NEVER deploy to production or public-facing environments.**

## Description

This single-file Node.js application creates a web server that displays all environment variables available to the Node.js process in an easy-to-read format. It features a dark-themed UI with a responsive grid layout.

## Installation

1. Make sure you have Node.js installed (version 12 or higher)

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   
   Or run directly:
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. You can also specify a custom port:
   ```bash
   PORT=8080 npm start
   ```

## Features

- **Pretty Web Interface**: Dark-themed, responsive design that displays environment variables in a grid layout
- **Sorted Display**: All environment variables are sorted alphabetically for easy browsing
- **JSON API**: Access environment variables as JSON at `/json` endpoint
- **Responsive Design**: Works well on desktop and mobile devices
- **Hover Effects**: Interactive UI elements for better user experience
- **Scrollable Values**: Long environment variable values are scrollable within their containers

## API Endpoints

### GET /
Returns an HTML page displaying all environment variables in a pretty format.

### GET /json
Returns environment variables as JSON:
```json
{
  "count": 42,
  "variables": {
    "HOME": "/Users/username",
    "PATH": "/usr/local/bin:/usr/bin:/bin",
    ...
  }
}
```

## Example

To run with custom environment variables:
```bash
MY_API_KEY=secret123 NODE_ENV=development npm start
```

## Notes

- The server defaults to port 3000 unless the `PORT` environment variable is set
- All environment variable values are HTML-escaped to prevent XSS attacks
- The application has no external dependencies besides Express.js

## License

MIT