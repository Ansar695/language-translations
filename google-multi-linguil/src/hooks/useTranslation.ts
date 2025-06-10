import { useState, useCallback } from 'react';
import translationService from '../services/translationService';
import { type HistoryItem } from '../components/TranslationHistory';

interface UseTranslationReturn {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  isLoading: boolean;
  error: string | null;
  history: HistoryItem[];
  setSourceText: (text: string) => void;
  setTranslatedText: (text: string) => void;
  setSourceLanguage: (language: string) => void;
  setTargetLanguage: (language: string) => void;
  translateText: () => Promise<void>;
  swapLanguages: () => void;
  clearHistory: () => void;
  selectHistoryItem: (item: HistoryItem) => void;
  clearError: () => void;
}

export const useTranslation = (): UseTranslationReturn => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const translateText = useCallback(async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setError('Source and target languages cannot be the same');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await translationService.translateText(
        sourceText,
        targetLanguage,
        sourceLanguage
      );

      setTranslatedText(result.translatedText);

      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        sourceText,
        translatedText: result.translatedText,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
      };

      setHistory(prev => [historyItem, ...prev.slice(0, 49)]); // Keep last 50 items
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);

  const swapLanguages = useCallback(() => {
    const tempLang = sourceLanguage;
    const tempText = sourceText;
    
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setSourceText(translatedText);
    setTranslatedText(tempText);
  }, [sourceLanguage, targetLanguage, sourceText, translatedText]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const selectHistoryItem = useCallback((item: HistoryItem) => {
    setSourceText(item.sourceText);
    setTranslatedText(item.translatedText);
    setSourceLanguage(item.sourceLanguage);
    setTargetLanguage(item.targetLanguage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
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
  };
};