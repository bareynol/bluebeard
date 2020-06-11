// @target: es2017
// @module: esnext
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import lightTheme from '../native-base-theme/variables/lightTheme';
import darkTheme from '../native-base-theme/variables/darkTheme';
import { useSelector } from 'react-redux';

export function useThemeSetting() {
  const themeSetting = useSelector(state => state.settings.theme);
  return themeSetting;
}

export function useCurrentTheme() {
  const themeSetting = useThemeSetting();
  switch (themeSetting) {
    case "light":
      return getTheme({...commonColor, ...lightTheme});
    case "dark":
    default:
      return getTheme({...commonColor, ...darkTheme});
  }
}
