import api from './api';

/**
 * Fetch aggregated news from the backend.
 * @param {Object} params - Query parameters
 * @param {string} [params.category] - Filter by category (JAVA, SPRING, etc.)
 * @param {string} [params.language] - Filter by language (vi, en)
 * @param {string} [params.source] - Filter by source ID
 * @param {number} [params.limit] - Max number of items
 * @returns {Promise<{items: Array, total: number, cached: boolean}>}
 */
export async function fetchNews({ category, language, source, limit } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (language) params.set('language', language);
  if (source) params.set('source', source);
  if (limit) params.set('limit', String(limit));

  const queryString = params.toString();
  const url = `/api/news${queryString ? `?${queryString}` : ''}`;

  const res = await api.get(url);
  return res.data;
}
