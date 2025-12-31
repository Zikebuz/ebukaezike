// lib/rss.js

function decodeEntities(text) {
  if (!text) return '';
  // Simple browser-based decoder
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function getHighResImage(url) {
  if (!url) {
    return 'https://via.placeholder.com/800x450?text=No+Image';
  }
  return url.replace(/\/s[0-9]+(-c)?\//, '/s1600/');
}

export async function fetchRSS() {
  const RSS_URL = 'https://ebuztrend.blogspot.com/feeds/posts/default?alt=rss';
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

  const res = await fetch(API);
  if (!res.ok) return { items: [] };

  const data = await res.json();

  const normalizedItems = data.items.map((post) => ({
    ...post,
    // Decode HTML entities so &amp; becomes &
    title: decodeEntities(post.title),
    contentSnippet: decodeEntities(post.description?.replace(/<[^>]*>/g, '').slice(0, 120)),
    image: getHighResImage(post.thumbnail),
  }));

  return { items: normalizedItems };
}