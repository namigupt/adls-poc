export default function decorate(block) {
  // Get configuration from block content
  const config = {};
  const rows = block.querySelectorAll(':scope > div');
  
  rows.forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '_');
      const value = cells[1].textContent.trim();
      config[key] = value;
    }
  });

  // Clear the block content - no HTML should be rendered
  block.innerHTML = '';
  block.style.display = 'none';

  // Check if we have an authorization code in URL
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code');
  const error = urlParams.get('error');

  if (error) {
    console.error('OAuth Error:', error);
    return;
  }

  if (authCode) {
    // We have an auth code, exchange it for access token
    exchangeCodeForToken(authCode, config);
  } else {
    // Check if we already have a valid token
    const existingToken = sessionStorage.getItem('alm_access_token');
    if (!existingToken) {
      // Automatically start OAuth flow
      setTimeout(() => {
        startOAuthFlow(config);
      }, 1000);
    }
  }
}

function startOAuthFlow(config) {
  const clientId = '141c54f9-630a-4ba4-809f-a073d883b3f1';
  const redirectUri = window.location.origin + window.location.pathname;
  const scope = 'learner:read,learner:write';
  
  if (!clientId) {
    console.error('OAuth: Client ID is required');
    return;
  }

  const authUrl = new URL('https://learningmanager.adobe.com/oauth/o/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('account', '135626');

  // Redirect to Adobe Learning Manager OAuth
  window.location.href = authUrl.toString();
}

async function exchangeCodeForToken(code, config) {
  try {
    const tokenData = {
      grant_type: 'authorization_code',
      code: code,
      client_id: '141c54f9-630a-4ba4-809f-a073d883b3f1',
      client_secret: 'e34c73fb-a227-490d-a4d2-fdfd57fadf2a',
      redirect_uri: config.redirect_uri || window.location.origin + window.location.pathname
    };

    const response = await fetch('https://learningmanager.adobe.com/oauth/token', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(tokenData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tokenResponse = await response.json();
    
    // Store the access token
    sessionStorage.setItem('alm_access_token', tokenResponse.access_token);
    if (tokenResponse.refresh_token) {
      sessionStorage.setItem('alm_refresh_token', tokenResponse.refresh_token);
    }

    console.log('OAuth: Authentication successful');
    
    // Remove code parameter from URL and reload to clean up
    const url = new URL(window.location);
    url.searchParams.delete('code');
    url.searchParams.delete('state');
    window.location.href = url.toString();

  } catch (error) {
    console.error('OAuth: Failed to get access token:', error.message);
  }
}
