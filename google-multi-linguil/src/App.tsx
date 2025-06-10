import React from 'react';
import LanguageSelector from './components/LanguageSelector';
import TranslationTextArea from './components/TranslationTextArea';
import TranslationHistory from './components/TranslationHistory';
import { useTranslation } from './hooks/useTranslation';
import './App.css';

function App() {
  const {
    sourceText,
    translatedText,
    sourceLanguage,
    targetLanguage,
    isLoading,
    error,
    history,
    setSourceText,
    setTranslatedText,
    setSourceLanguage,
    setTargetLanguage,
    translateText,
    swapLanguages,
    clearHistory,
    selectHistoryItem,
    clearError,
  } = useTranslation();

  const handleTranslate = () => {
    clearError();
    translateText();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            🌍 Multi-Language Translator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Translate text between multiple languages instantly
          </p>
        </div>

        {/* Main Translation Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            {/* Language Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <LanguageSelector
                selectedLanguage={sourceLanguage}
                onLanguageChange={setSourceLanguage}
                label="From"
              />
              
              <div className="flex items-end justify-center">
                <button
                  onClick={swapLanguages}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors"
                  title="Swap languages"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </button>
              </div>

              <LanguageSelector
                selectedLanguage={targetLanguage}
                onLanguageChange={setTargetLanguage}
                label="To"
              />
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <TranslationTextArea
                value={sourceText}
                onChange={setSourceText}
                placeholder="Enter text to translate..."
                label="Source Text"
              />

              <TranslationTextArea
                value={translatedText}
                placeholder="Translation will appear here..."
                label="Translation"
                readOnly
                loading={isLoading}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <div className="flex justify-between items-center">
                  <span>{error}</span>
                  <button
                    onClick={clearError}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleTranslate}
                disabled={isLoading || !sourceText.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onKeyDown={handleKeyPress}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Translating...
                  </div>
                ) : (
                  'Translate'
                )}
              </button>

              <button
                onClick={() => {
                  setSourceText('');
                  setTranslatedText('');
                  clearError();
                }}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>

            {/* Keyboard Shortcut Hint */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl + Enter</kbd> to translate
              </p>
            </div>
          </div>

          {/* Translation History */}
          <TranslationHistory
            history={history}
            onClearHistory={clearHistory}
            onSelectHistoryItem={selectHistoryItem}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
