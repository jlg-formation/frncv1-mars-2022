import React from 'react';
import {StyleSheet, View} from 'react-native';
import NewArticle from '../widgets/NewArticle';

const Wall = () => {
  return (
    <View style={styles.container}>
      <NewArticle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wall;
