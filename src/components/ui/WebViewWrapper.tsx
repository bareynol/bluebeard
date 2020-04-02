import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import WebView from 'react-native-webview';

function useCombinedRefs(...refs) {
  const targetRef = React.useRef()

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

const WebViewWrapper = React.forwardRef((webviewProps, ref): JSX.Element => {
  // webviewRef is the internal ref used by this component to handle
  // applying internal webview navigation commands
  // combinedRef is the internal webviewRef combined with any passed ref that
  // needs to be forwarded to the webview component
  const webviewRef = useRef<WebView>(null);
  const combinedRef = useCombinedRefs(ref, webviewRef);

  const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = (navState) => {
    webviewProps.onNavigationStateChange?.(navState);
    if (navState) {
      setCanGoBack(navState.canGoBack)
    }
  }

  const onMessage = (event) => {
    webviewProps.onMessage?.(event);
    if (event?.nativeEvent) {
      setCanGoBack(event.nativeEvent.canGoBack);
    }
  }

  const onAndroidBackPress = (): boolean => {
    if (combinedRef.current && canGoBack) {
      combinedRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect((): (() => void) => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [canGoBack]); // update the event listener handler when canGoBack changes

  return (
    <WebView
      {...webviewProps}
      injectedJavaScript={PUSH_STATE_NAVIGATION_LISTENER}
      onNavigationStateChange={onNavigationStateChange}
      onMessage={onMessage}
      ref={combinedRef}
    />
  )
})

const PUSH_STATE_NAVIGATION_LISTENER = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage(window.location.href);
      return res;
    }
  }
  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage(window.location.href);
  });
})();
true;
`

export default WebViewWrapper;
