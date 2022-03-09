import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const Wall = () => {
  return (
    <View style={styles.container}>
      <Text>Wall works!</Text>
      <Icon name="cat" type="font-awesome-5" tvParallaxProperties={undefined} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
});

export default Wall;
