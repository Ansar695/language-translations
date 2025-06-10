// For production, you would use the official Google Cloud Translation API
// This is a simplified version using a free translation API for demonstration
const TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get';

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
];

export class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  private getCacheKey(text: string, from: string, to: string): string {
    return `${text}|${from}|${to}`;
  }

  public async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage: string = 'auto'
  ): Promise<TranslationResponse> {
    if (!text.trim()) {
      throw new Error('Text cannot be empty');
    }

    if (sourceLanguage === targetLanguage) {
      throw new Error('Source and target languages cannot be the same');
    }

    const cacheKey = this.getCacheKey(text, sourceLanguage, targetLanguage);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return {
        translatedText: this.cache.get(cacheKey)!,
        sourceLanguage,
        targetLanguage,
      };
    }

    try {
      const url = new URL(TRANSLATION_API_URL);
      url.searchParams.append('q', text);
      url.searchParams.append('langpair', `${sourceLanguage}|${targetLanguage}`);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.responseData) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the result
        this.cache.set(cacheKey, translatedText);
        
        return {
          translatedText,
          sourceLanguage: sourceLanguage === 'auto' ? 'auto' : sourceLanguage,
          targetLanguage,
        };
      } else {
        throw new Error('Invalid response from translation service');
      }
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text. Please try again.');
    }
  }

  public async detectLanguage(text: string): Promise<string> {
    try {
      const url = new URL(TRANSLATION_API_URL);
      url.searchParams.append('q', text);
      url.searchParams.append('langpair', 'auto|en');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        // This is a simplified detection - in a real app you'd use proper language detection
        return 'auto';
      }
      return 'en';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en';
    }
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export default TranslationService.getInstance();