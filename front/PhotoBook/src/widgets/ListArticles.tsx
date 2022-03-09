import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  fetchAllArticles,
  selectAllArticles,
  selectArticleStatus,
} from '../redux/slices/articles.slice';

const ListArticles = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);
  const articleStatus = useAppSelector(selectArticleStatus);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchAllArticles());
      } catch (err) {
        console.log('err: ', err);
      }
    })();
  }, [dispatch]);
  return (
    <ScrollView style={styles.container}>
      {articleStatus === 'loading' && <ActivityIndicator />}
      {articles.map(article => {
        return (
          <View style={styles.article} key={article.id}>
            <Text style={styles.articleText}>{article.content}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  article: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  articleText: {
    color: 'black',
  },
});

export default ListArticles;
