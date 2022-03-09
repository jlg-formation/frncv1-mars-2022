import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
  User,
} from '../redux/slices/authentication.slice';

const Login = ({navigation}: ScreenProps<'Login'>) => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector(selectAuthentication);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authentication.user) {
      navigation.navigate('Home', {screen: 'Wall'});
    }
  });

  const onSubmit = async () => {
    setErrorMessage('');
    const response = await api.connect('jlg@jlg.com', 'adsfasdfasdf');
    if (response.status !== 200) {
      if (response.status === 401) {
        setErrorMessage('bad credentials');
        return;
      }
      setErrorMessage('oups. technical error');
      return;
    }
    const user: User = await response.json();
    dispatch(connect(user));
  };

  return (
    <View>
      <Text>Login works!</Text>
      <Button title={'Connect'} onPress={onSubmit} />
      {errorMessage !== '' && <Text>error: {errorMessage}</Text>}
    </View>
  );
};

export default Login;
