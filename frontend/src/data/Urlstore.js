const STORAGE_KEY = "urlMap";

// Load from localStorage
function getStoredMap() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

// Save to localStorage
function saveMap(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// Create a short URL
export const createShortUrl = ({ longUrl, customCode, validity }) => {
  const map = getStoredMap();
  const expiryTime = Date.now() + (validity || 30) * 60 * 1000;

  let shortCode = customCode || Math.random().toString(36).substring(2, 8);
  while (map[shortCode]) {
    if (customCode) throw new Error("Custom shortcode already exists");
    shortCode = Math.random().toString(36).substring(2, 8);
  }

  map[shortCode] = { longUrl, expiryTime };
  saveMap(map);

  return { shortCode, expiryTime };
};

// Get long URL from shortcode
export const getLongUrl = (code) => {
  const map = getStoredMap();
  const entry = map[code];
  if (!entry) throw new Error("Shortcode not found");
  if (Date.now() > entry.expiryTime) throw new Error("Link expired");
  return entry.longUrl;
};
