import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import { useAuth } from '../../hooks/Auth';
import {
  Container,
  Header,
  HeaderTitle,
  EmptyButton,
  UserAvatar,
  Content,
  ProviersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  ShowDatePickerToggle,
  ShowDatePickerToggleText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const response = await api.get('/providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const toggleCalendarModal = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleHourChange = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleDateChange = useCallback(
    (event: any, date: Date | undefined) => {
      if (showDatePicker) setShowDatePicker(state => !state);

      if (date) setSelectedDate(date);
    },
    [showDatePicker],
  );

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      await api.post('/appointments', {
        date,
        provider_id: selectedProvider,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate, selectedHour]);

  useEffect(() => {
    async function loadAvailability(): Promise<void> {
      const response = await api.get(
        `/providers/${selectedProvider}/availability/day`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setAvailability(response.data);
    }

    loadAvailability();
  }, [selectedDate, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(
        availabilityItem =>
          availabilityItem.hour < 12 && availabilityItem.available === true,
      )
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(
        availabilityItem =>
          availabilityItem.hour >= 12 && availabilityItem.available === true,
      )
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <EmptyButton onPress={navigateToDashboard}>
          <Icon name="arrow-left" size={24} color="#999591" />
        </EmptyButton>
        <HeaderTitle>Agendamento</HeaderTitle>
        <EmptyButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </EmptyButton>
      </Header>
      <Content>
        <ProviersListContainer>
          <ProvidersList
            data={providers}
            horizontal
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => {
                  setSelectedProvider(provider.id);
                }}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProviersListContainer>
        <Calendar>
          <Title>Escolha a data</Title>
          <ShowDatePickerToggle onPress={toggleCalendarModal}>
            <Icon name="calendar" size={32} color="#000" />
            <ShowDatePickerToggleText>Alterar data</ShowDatePickerToggleText>
          </ShowDatePickerToggle>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              onChange={handleDateChange}
              display="calendar"
              textColor="#f4ede8"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ formattedHour, hour }) => (
                <Hour
                  key={formattedHour}
                  onPress={() => {
                    setSelectedHour(hour);
                  }}
                  selected={hour === selectedHour}
                >
                  <HourText selected={hour === selectedHour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ formattedHour, hour }) => (
                <Hour
                  key={formattedHour}
                  onPress={() => {
                    handleHourChange(hour);
                  }}
                  selected={hour === selectedHour}
                >
                  <HourText selected={hour === selectedHour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
