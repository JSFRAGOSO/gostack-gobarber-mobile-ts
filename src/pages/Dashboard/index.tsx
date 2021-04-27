import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  Content,
  ContentTitle,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderSchedule,
  ProviderScheduleInfo,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const response = await api.get('/providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <Content>
        <ContentTitle>Cabelereiros</ContentTitle>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>
                <ProviderSchedule>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderScheduleInfo>Segunda à Sexta</ProviderScheduleInfo>
                </ProviderSchedule>
                <ProviderSchedule>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderScheduleInfo>Das 9h às 18h</ProviderScheduleInfo>
                </ProviderSchedule>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
