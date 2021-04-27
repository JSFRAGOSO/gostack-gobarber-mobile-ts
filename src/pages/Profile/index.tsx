import React, { useRef, useCallback } from 'react';
import { ScrollView, TextInput, Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  GoBackButton,
  Title,
  LogoutButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string | undefined;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleUpateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um Avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar Câmera',
        chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('ImagePicker Error: ', response.error);
          return;
        }

        const source = { uri: response.uri };

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: source.uri,
        });

        api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo Obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo Obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'Senha e Confirmação de senha diferem',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso');
        navigation.goBack();
      } catch (err) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <ScrollView>
      <Container>
        <Header>
          <GoBackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={20} color="#999591" />
          </GoBackButton>
          <Title>Meu Perfil</Title>
          <LogoutButton onPress={handleLogOut}>
            <Icon name="power" size={20} color="#999591" />
          </LogoutButton>
        </Header>
        <UserAvatarButton onPress={handleUpateAvatar}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </UserAvatarButton>
        <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
          <Input
            autoCapitalize="words"
            name="name"
            icon="user"
            containerStyle={{ marginTop: 20 }}
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
            onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
          />
          <Input
            ref={oldPasswordInputRef}
            secureTextEntry
            name="old_password"
            icon="lock"
            returnKeyType="next"
            placeholder="Senha Atual"
            containerStyle={{ marginTop: 30 }}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            secureTextEntry
            name="password"
            icon="lock"
            returnKeyType="next"
            placeholder="Nova Senha"
            onSubmitEditing={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          />
          <Input
            ref={confirmPasswordInputRef}
            secureTextEntry
            name="password_confirmation"
            icon="lock"
            returnKeyType="send"
            placeholder="Confirmar Senha"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Confirmar Mudanças
          </Button>
        </Form>
      </Container>
    </ScrollView>
  );
};

export default Profile;
