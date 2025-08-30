# 🐝 Bee Movie RAG Chatbot

A React-based chatbot that answers questions about "The Bee Movie" using RAG (Retrieval-Augmented Generation) technology. The chatbot features a beautiful glassmorphic UI with smooth animations and connects to an n8n workflow for intelligent responses.

## 🚀 Features

- **RAG-powered responses** - Get accurate answers about The Bee Movie
- **Glassmorphic UI** - Modern, translucent design with smooth animations
- **Real-time chat** - Interactive conversation interface
- **Markdown support** - Rich text formatting for responses
- **Responsive design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Markdown** - Markdown rendering

### Backend & AI
- **n8n** - Workflow automation and RAG processing
- **RAG (Retrieval-Augmented Generation)** - AI-powered question answering

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- n8n instance running with your RAG workflow

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone n8n-moviescript-rag-bot
   cd n8n-moviescript-rag-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_N8N_TEST_URL=your_n8n_workflow_url_here
   VITE_N8N_PROD_URL=your_n8n_workflow_url_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── ChatUI.tsx      # Main chat interface component
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 How It Works

The chatbot connects to an n8n workflow that processes user queries using RAG technology. When you ask a question about The Bee Movie, the system:

1. Sends your query to the n8n workflow
2. The workflow retrieves relevant information from the movie database
3. Generates an intelligent response using AI
4. Returns the answer to display in the chat interface

## 🎨 UI Features

- **Glassmorphic design** - Translucent, modern interface
- **Smooth animations** - Framer Motion-powered transitions
- **Loading states** - Bee Movie GIF during processing
- **Responsive layout** - Adapts to different screen sizes
- **Markdown rendering** - Rich text formatting support

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
