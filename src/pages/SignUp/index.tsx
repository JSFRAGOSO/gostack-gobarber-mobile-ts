import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToLoginButton,
  BackToLoginButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'Mínimo 6 carácteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'você já pode fazer login',
        );
        navigation.goBack();
      } catch (err) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
    },
    [navigation],
  );

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Image source={logoImg} />
            <Title>Crie sua conta</Title>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              placeholder="Nome"
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              returnKeyType="next"
              placeholder="Email"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              returnKeyType="send"
              placeholder="Senha"
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
        </Container>
      </ScrollView>
      <BackToLoginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginButtonText>Voltar para logon</BackToLoginButtonText>
      </BackToLoginButton>
    </>
  );
};

export default SignUp;
