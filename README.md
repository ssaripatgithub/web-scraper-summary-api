# Web Scraper Summary API

## Overview
web-scraper-summary-api is an api that allow users to automate the process of scraping webpage content and generating summaries using a large language model (LLM). The user can submit a simple POST request to specify the url and the API will scrape the content, send the content to an LLM for summarizing, save the summarized content in the database and return the summarized content to the user.

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [Bun](https://bun.sh/) (preferred for faster installation)
- [MongoDB](https://www.mongodb.com) (local or cloud instance)
- AIML API key (setup a free key [here](https://aimlapi.com/))

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ssaripatgithub/web-scraper-summary-api.git
cd web-scraper-summary-api
```
### 2. Install dependencies
Using npm:
```bash
npm install
```
Using bun:
```bash
bun install
```

### 3. Create a .env file
Create a .env file in the project root and populate it with the following environment variables:
```dotenv
PORT=3000  
DATABASE_CONNECTION=your_mongodb_connection  
LLM_API=https://api.aimlapi.com/chat/completions  
LLM_MODEL=gpt-4o  
LLM_API_KEY=your_api_key_here  
SUMMARIZE_PROMPT=Summarize the following text from the webpage  
LLM_MAX_TOKEN=500  
LLM_MIN_TOKEN=200  
LLM_ROLE=user
```

### 4. Start the MongoDB server
Ensure your MongoDB instance is running.

### 5. Run the application
Using npm:
```bash
npm run start:dev
```
Or using bun:
```bash
bun start:dev
```

### 6. Access the API
The API will be available at http://localhost:3000.

## Usage

### Submit a Job
To scrape a webpage and generate a summary, send a POST request to:

- **POST /jobs**
#### Request Body
```json
{  
  "url": "https://example.com"  
}  
```

### Get Job Status
To check the status or retrieve the summary of a submitted job, send a GET request to:
- **GET /jobs/:id**
#### Request Body
```json
{  
  "id": "12345",  
  "url": "https://example.com",  
  "status": "completed",  
  "summary": "This is the summary of the webpage content."  
}
```

### License
This project is licensed under the MIT License.