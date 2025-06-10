import React from 'react';
import { supportedLanguages } from '../services/translationService';

export interface HistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
}

interface TranslationHistoryProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

const TranslationHistory: React.FC<TranslationHistoryProps> = ({
  history,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  const getLanguageName = (code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? `${language.flag} ${language.name}` : code;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Translation History
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No translations yet. Start translating to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Translation History
        </h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectHistoryItem(item)}
            className="p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getLanguageName(item.sourceLanguage)} → {getLanguageName(item.targetLanguage)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(item.timestamp)}
              </div>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 mb-1">
              <strong>Source:</strong> {item.sourceText.substring(0, 100)}
              {item.sourceText.length > 100 && '...'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Translation:</strong> {item.translatedText.substring(0, 100)}
              {item.translatedText.length > 100 && '...'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationHistory;