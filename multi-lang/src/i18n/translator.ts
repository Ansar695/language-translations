/* eslint-disable @typescript-eslint/no-explicit-any */
const GOOGLE_API_KEY =
  import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY ||
  import.meta.env.GOOGLE_TRANSLATE_API_KEY;
const MAX_SEGMENTS = 128;

export const translatePage = async (targetLang: string) => {
  const textNodes = getAllTextNodes(document.body);
  const allTexts = textNodes.map(node => node.nodeValue || '');

  const batches = chunkArray(allTexts, MAX_SEGMENTS);
  const nodeBatches = chunkArray(textNodes, MAX_SEGMENTS);

  for (let i = 0; i < batches.length; i++) {
    const texts = batches[i];
    const nodes = nodeBatches[i];

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            q: texts,
            target: targetLang,
            format: 'text',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      const translations = data.data.translations;

      translations.forEach((t: any, j: number) => {
        nodes[j].nodeValue = t.translatedText;
      });
    } catch (error) {
      console.error(`Error translating batch ${i + 1}:`, error);
    }
  }
};

// Helper: Get all text nodes
const getAllTextNodes = (node: Node): Text[] => {
  const textNodes: Text[] = [];

  const walk = (node: Node) => {
    if (
      node.nodeType === Node.TEXT_NODE &&
      node.nodeValue &&
      node.nodeValue.trim() !== ''
    ) {
      textNodes.push(node as Text);
    } else {
      node.childNodes.forEach(walk);
    }
  };

  walk(node);
  return textNodes;
};

// Helper: Chunk array
const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
