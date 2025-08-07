export default async function handler(req, res) {
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const backendUrl = 'https://tma-ofm-react-template.vercel.app';
  
  try {
    // Extract path from URL
    const urlPath = req.url.replace('/api/proxy/', '');
    const targetUrl = `${backendUrl}/api/${urlPath}`;
    
    console.log('Proxying request to:', targetUrl);
    
    // Prepare request body
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = JSON.stringify(req.body);
    }
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...(body && { body })
    });
    
    const responseText = await response.text();
    console.log('Backend response status:', response.status);
    console.log('Backend response:', responseText);
    
    // Forward the response
    res.status(response.status);
    
    try {
      const jsonData = JSON.parse(responseText);
      res.json(jsonData);
    } catch {
      res.send(responseText);
    }
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}