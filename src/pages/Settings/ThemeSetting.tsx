import React, { useCallback } from 'react';
import ListItemPicker from 'components/ui/ListItemPicker';
import { setTheme } from 'services/settings/actions';
import { useDispatch } from 'react-redux';
import { useThemeSetting } from 'theme';
import { Alert } from 'react-native';

export default function ThemeSetting(props) {
  const dispatch = useDispatch();
  const themeSetting = useThemeSetting();
  const confirmChange = useCallback((val) => (
    Alert.alert(
      "App restart required",
      "Changing the theme requires the app to be restarted",
      [
        {
          text: "OK",
          onPress: () => handleThemeChange(val),
        }
      ]
    )
  ), [])

  const handleThemeChange = useCallback((val) => {
    dispatch(setTheme(val));
  }, [dispatch]);

  return (
    <ListItemPicker
      label="Theme Preference"
      selectedValue={themeSetting}
      options={[
        {name: "Dark", value: 'dark'},
        {name: "Light", value: 'light'},
      ]}
      onValueChange={confirmChange}
    />
  )
}
