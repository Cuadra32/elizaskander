/**
 * Netlify Function: Racing Post proxy
 * Fetches racingpost.com pages server-side to bypass CORS.
 * Only allows racingpost.com URLs for security.
 */
exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  const url = (event.queryStringParameters || {}).url;

  if (!url || !/^https:\/\/(www\.)?racingpost\.com\//.test(url)) {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Only racingpost.com URLs are allowed.' })
    };
  }

  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'identity'
      },
      redirect: 'follow'
    });

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Racing Post returned HTTP ' + resp.status })
      };
    }

    let html = await resp.text();

    // Strip heavy assets to reduce payload — keep scripts that carry data
    html = html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<link\s[^>]*rel=["']stylesheet["'][^>]*>/gi, '')
      .replace(/<img[^>]*>/gi, '')
      .replace(/<video[\s\S]*?<\/video>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<picture[\s\S]*?<\/picture>/gi, '');

    return {
      statusCode: 200,
      headers: {
        ...cors,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=120'
      },
      body: html
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
