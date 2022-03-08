import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Home: React.FC<{
  truc: string;
}> = ({truc, children}) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    console.log('hello use effect');
    return () => {
      console.log('on destroy');
    };
  }, []);

  if (counter > 15) {
    throw new Error('oups. Counter is too big.');
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        accessibilityLabel="un texte avec asdfasdf"
        onPress={() => {
          console.log('coucou');
        }}>
        <Text>{truc} works!</Text>
      </TouchableHighlight>
      <Text>
        counter: <Text style={styles.bold}>{counter}</Text>{' '}
      </Text>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
        accessibilityLabel="image de counter"
      />
      <Button
        title="Increment"
        onPress={() => {
          setCounter(counter + 1);
        }}
      />
      <Toto
        counter={counter}
        decrement={() => {
          setCounter(counter - 1);
        }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  bold: {fontWeight: 'bold', fontSize: 40},
  image: {
    height: 50,
    width: '100%',
    resizeMode: 'contain',
  },
});

const Toto: React.FC<{
  counter: number;
  decrement: () => void;
}> = ({counter, decrement}) => {
  return (
    <>
      <Text>coucou toto {counter}</Text>
      <Button title="decrement" onPress={decrement} />
    </>
  );
};

export default Home;
