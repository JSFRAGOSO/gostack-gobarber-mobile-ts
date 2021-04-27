import React, { useCallback, useRef } from 'react';
import { Image, TextInput, Alert } from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        Alert.alert(
          'Falha na autenticação',
          'Usuário ou senha não encontrados',
        );
      }
    },
    [signIn],
  );
  return (
    <>
      <Container>
        <Image source={logoImg} />
        <Title>Faça seu logon</Title>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
            icon="mail"
            placeholder="Email"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <Input
            ref={passwordRef}
            secureTextEntry
            name="password"
            icon="lock"
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
          </Button>
        </Form>

        <ForgotPassword
          onPress={() => {
            console.log('Deu 2');
          }}
        >
          <ForgotPasswordText>Esqueçi minha senha</ForgotPasswordText>
        </ForgotPassword>
      </Container>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
