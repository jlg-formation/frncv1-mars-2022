import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScreenProps} from '../navigation';

const Home = ({navigation}: ScreenProps<'Home'>) => {
  console.log('homex');
  return (
    <View style={styles.container}>
      <Text>Hello Home.</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'yellow',
  },
});

export default Home;
