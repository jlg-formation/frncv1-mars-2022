import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
  User,
} from '../redux/slices/authentication.slice';

import {useForm, Controller} from 'react-hook-form';
import {Credentials} from '../interfaces/Credentials';

const Login = ({navigation}: ScreenProps<'Login'>) => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector(selectAuthentication);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'toto@toto.com',
      password: 'qqq',
    } as Credentials,
  });

  useEffect(() => {
    if (authentication.user) {
      navigation.navigate('Home', {screen: 'Wall'});
    }
  });

  const onSubmit = async (credentials: Credentials) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await api.connect(
        credentials.email,
        credentials.password,
      );
      setIsLoading(false);
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
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('oups. unexpected technical error');
    }
  };

  return (
    <View>
      <Text>Login works!</Text>
      <Button
        title={'Connect'}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
      {errorMessage !== '' && <Text>error: {errorMessage}</Text>}
    </View>
  );
};

export default Login;
