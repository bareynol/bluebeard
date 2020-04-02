import React, { useEffect, useRef } from 'react';
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
  const webviewRef = useRef<WebView>(null);
  const combinedRef = useCombinedRefs(ref, webviewRef);


  const onAndroidBackPress = (): boolean => {
    if (combinedRef.current) {
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
  }, []); // Never re-run this effect

  return (
    <WebView
      {...webviewProps}
      ref={combinedRef}
    />
  )
})

export default WebViewWrapper;
