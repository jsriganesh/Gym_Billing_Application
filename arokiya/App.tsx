import { View, Text } from 'react-native'
import React from 'react'
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
      <PaperProvider theme={theme}>

    <RootNavigation/>
    </PaperProvider>
    </MenuProvider>
    </Provider>
  )
}

export default App