import React from 'react';
import { Button, Icon } from 'native-base';
import { useCurrentTheme } from 'theme';

export default function WebviewRefreshButton({webviewRef}) {
  const theme = useCurrentTheme();
  function refreshWebview() {
    webviewRef.current.reload();
  }
  return (
    <Button transparent onPress={refreshWebview}>
      <Icon name="md-refresh" style={{color: theme.variables.inverseTextColor}} />
    </Button>
  )
}
