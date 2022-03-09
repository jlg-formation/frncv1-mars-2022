import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {api} from '../api';
import {Credentials} from '../interfaces/Credentials';
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
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'jlg@jlg.com',
      password: '',
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
    <View style={styles.container}>
      <Text style={styles.title}>PhotoBook</Text>
      <Controller
        control={control}
        rules={{
          required: 'email required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            placeholder="Email"
            errorStyle={styles.error}
            errorMessage={errors.email && errors.email.message}
            autoCompleteType={undefined}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            errorStyle={styles.error}
            errorMessage={errors.password && 'Text is required'}
            autoCompleteType={undefined}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />

      <Button
        containerStyle={styles.button}
        title={'Connect'}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
      {errorMessage !== '' && <Text>error: {errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {},
  error: {color: 'red'},
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    marginTop: 50,
    width: '100%',
  },
});

export default Login;
