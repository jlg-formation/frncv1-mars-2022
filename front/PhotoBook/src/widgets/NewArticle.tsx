import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const [text, setText] = useState('');
  const authentication = useAppSelector(selectAuthentication);

  const submit = () => {
    Alert.alert('coucou');
  };
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder={`Hello ${authentication.user?.displayName}, what's on your mind?`}
        placeholderTextColor="#000"
      />
      <Button title="Post" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
});

export default NewArticle;
