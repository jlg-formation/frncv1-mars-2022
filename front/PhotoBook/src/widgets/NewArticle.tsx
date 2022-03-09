import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {api} from '../api';
import {useAppSelector} from '../redux/hooks';
import {Article} from '../redux/slices/articles.slice';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const [text, setText] = useState('');
  const authentication = useAppSelector(selectAuthentication);

  const submit = async () => {
    try {
      const article: Article = {
        content: text,
        images: [] as string[],
      } as Article;
      const response = await api.addNewArticle(article);
      console.log('response: ', response);
    } catch (err) {
      console.log('err: ', err);
    }
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
