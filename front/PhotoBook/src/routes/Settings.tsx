import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {api} from '../api';
import {useAppDispatch} from '../redux/hooks';
import {disconnect} from '../redux/slices/authentication.slice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await api.disconnect();
      setIsLoading(false);
      dispatch(disconnect(undefined));
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={'Disconnect'} onPress={onSubmit} loading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

export default Settings;
