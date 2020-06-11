import React, { useEffect, useState, useCallback, useRef } from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'

import {OMBI_USERNAME, OMBI_PASSWORD} from 'react-native-dotenv';
import WebviewRefreshButton from 'components/ui/WebviewRefreshButton';

export default function Ombi() {
  // const [expiration, setExpiration] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const webviewRef = useRef(null);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getOmbiToken().then(data => {
      if (data) {
        // setExpiration(data.expiration);
        setAccessToken(data.access_token);
      }
    })
  }, [])

  const injectToken = useCallback(() => {
    if (!loaded) {
      setLoaded(true);
      const INJECTED_JAVASCRIPT = `(function() {
        window.localStorage.setItem("id_token", "${accessToken}");
      })();`;

      if (webviewRef && webviewRef.current) {
        webviewRef.current.injectJavaScript(INJECTED_JAVASCRIPT)
        webviewRef.current.reload()
      }
    }
  }, [accessToken, loaded])

  return (
    <Container>
      <AppHeader title="Ombi" icons={<WebviewRefreshButton webviewRef={webviewRef} />} />
      <WebViewWrapper
        ref={webviewRef}
        domStorageEnabled={true}
        source={{uri: `${serviceAddresses.ombi}/search`}}
        onLoadEnd={injectToken}
      />
    </Container>
  )
}

async function getOmbiToken() {
  const response = await fetch(`${serviceAddresses.ombi}/api/v1/token/`, {
    method: 'post',
    body: JSON.stringify({username: OMBI_USERNAME, password: OMBI_PASSWORD, rememberMe: true, usePlexOAuth: false}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) return {access_token: "", expiration: null};

  return await response.json();
}
