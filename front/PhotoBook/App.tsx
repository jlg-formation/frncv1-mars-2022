/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import ErrorBoundary from './src/ErrorBoundaries';
import {Stack} from './src/navigation';
import {useAppSelector} from './src/redux/hooks';
import {selectAuthentication} from './src/redux/slices/authentication.slice';
import {store} from './src/redux/store';
import Home from './src/routes/Home';
import Login from './src/routes/Login';

const App = () => {
  return (
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  );
};

const ReduxApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('truc truc truc');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const authentication = useAppSelector(selectAuthentication);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ErrorBoundary>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={authentication.user ? 'Home' : 'Login'}
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
            </NavigationContainer>
          </ErrorBoundary>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
console.log('styles: ', styles);

export default App;
