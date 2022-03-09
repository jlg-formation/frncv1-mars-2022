import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {ScreenProps} from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';
import Legal from './Legal';
import Settings from './Settings';
import Wall from './Wall';

const Tab = createBottomTabNavigator();

const Home = ({navigation}: ScreenProps<'Home'>) => {
  const authentication = useAppSelector(selectAuthentication);
  useEffect(() => {
    if (authentication.user === undefined) {
      navigation.navigate('Login');
    }
  }, [navigation, authentication]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let name = '';
          switch (route.name) {
            case 'Wall':
              name = 'cat';
              break;
            case 'Legal':
              name = 'balance-scale';
              break;
            case 'Settings':
              name = 'cog';
              break;
            default:
              break;
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={name}
              type="font-awesome-5"
              tvParallaxProperties={undefined}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Wall" component={Wall} />
      <Tab.Screen name="Legal" component={Legal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: 'yellow',
//   },
// });

export default Home;
