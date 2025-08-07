export default async function handler(req, res) {
  const { path, ...query } = req.query;
  const backendUrl = 'https://tma-ofm-react-template.vercel.app';
  
  try {
    // Construct the target URL
    const targetPath = Array.isArray(path) ? path.join('/') : path;
    const queryString = new URLSearchParams(query).toString();
    const targetUrl = `${backendUrl}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.body && { 'Content-Length': JSON.stringify(req.body).length })
      },
      ...(req.body && { body: JSON.stringify(req.body) })
    });
    
    const data = await response.text();
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Forward the response
    res.status(response.status);
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.send(data);
    }
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
}