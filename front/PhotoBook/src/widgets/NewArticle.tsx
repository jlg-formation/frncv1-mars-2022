import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {api} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {Article, fetchAllArticles} from '../redux/slices/articles.slice';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  const submit = async () => {
    try {
      setIsLoading(true);
      const article: Article = {
        content: text,
        images: [] as string[],
      } as Article;
      setText('');
      const response = await api.addNewArticle(article);
      setIsLoading(false);
      console.log('response: ', response);
      dispatch(fetchAllArticles());
    } catch (err) {
      setIsLoading(false);
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
      <Button title="Post" onPress={submit} loading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    margin: 10,
  },
  input: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
});

export default NewArticle;
