import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

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
    <View>
      <Text>{truc} works!</Text>
      <Text>counter: {counter} </Text>
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
