# 🌍 Multi-Language Translator

A modern, responsive web application for translating text between multiple languages using translation APIs. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Multi-language Support**: Translate between 15+ languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Urdu, Turkish, and Dutch
- **Real-time Translation**: Instant translation with loading indicators
- **Translation History**: Keep track of your recent translations
- **Language Swapping**: Easily swap source and target languages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Mode Support**: Built-in dark mode compatibility
- **Keyboard Shortcuts**: Use Ctrl+Enter to translate quickly
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Caching**: Smart caching to improve performance and reduce API calls

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd google-multi-linguil
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional for Google Translate API)
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Google Cloud Translation API key:
   ```
   VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   VITE_GOOGLE_CLOUD_PROJECT_ID=your_project_id_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Configuration

### Using Google Cloud Translation API (Recommended for Production)

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable the Translation API**
   - Navigate to APIs & Services > Library
   - Search for "Cloud Translation API"
   - Click "Enable"

3. **Create API Credentials**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy your API key

4. **Update the Translation Service**
   - Modify `src/services/translationService.ts` to use the Google Cloud Translation API
   - Replace the current implementation with the official Google Cloud client

### Current Implementation

The current implementation uses a free translation API (MyMemory) for demonstration purposes. For production use, it's recommended to switch to Google Cloud Translation API for better accuracy and reliability.

## 🛠️ Built With

- **React 19** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests

## 📱 Usage

1. **Select Languages**: Choose your source and target languages from the dropdown menus
2. **Enter Text**: Type or paste the text you want to translate in the source text area
3. **Translate**: Click the "Translate" button or press Ctrl+Enter
4. **View Results**: The translation will appear in the target text area
5. **History**: Access your translation history in the panel below
6. **Swap Languages**: Use the swap button to quickly reverse the translation direction

## 🎨 Features in Detail

### Language Support
- 15+ supported languages with flag emojis
- Easy language selection with visual indicators
- Auto-detection capabilities (when using Google Translate API)

### User Interface
- Clean, modern design with gradient backgrounds
- Responsive layout that works on all devices
- Loading states and error handling
- Keyboard shortcuts for power users

### Performance
- Client-side caching to reduce API calls
- Optimized re-renders with React hooks
- Lazy loading and code splitting ready

## 🔮 Future Enhancements

- [ ] Voice input and output
- [ ] Document translation (PDF, DOCX)
- [ ] Batch translation
- [ ] Translation confidence scores
- [ ] Offline translation capabilities
- [ ] User accounts and saved translations
- [ ] Translation quality feedback
- [ ] Custom translation models

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Cloud Translation API for translation services
- MyMemory Translation API for the demo implementation
- Tailwind CSS for the beautiful styling
- React team for the amazing framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy Translating! 🌍✨**
