const generateUUID = (): string => {
  // Check if the modern API is available and in a secure context
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  // Fallback for non-secure contexts (http) or older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// TODO: Improve username generation with more variety
const generateUsername = (): string => {
  const adjectives = ['Creative', 'Brilliant', 'Dynamic', 'Innovative', 'Visionary'];
  const nouns = ['Artist', 'Designer', 'Maker', 'Creator', 'Inventor'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}`;
}

// TODO: Improve color generation for colors that work well
const generateColor = (): string => {
  const hexChars = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 }, () => hexChars[Math.floor(Math.random() * hexChars.length)]).join('');
}

export { generateUUID, generateUsername, generateColor };
