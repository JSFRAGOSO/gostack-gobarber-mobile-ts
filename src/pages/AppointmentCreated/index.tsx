import React, { useCallback, useMemo } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImagePickerIOS } from 'react-native';
import {
  Container,
  Title,
  DescriptionContainer,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const navigateToDashboard = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const formattedDate = useMemo(
    () =>
      format(
        routeParams.date,
        "EEEE ', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
        {
          locale: ptBR,
        },
      ),
    [],
  );

  return (
    <Container>
      <Icon name="check" size={80} color="#04d230" />
      <Title>Agendamento</Title>
      <Title>concluído</Title>
      <DescriptionContainer>
        <Description>{formattedDate}</Description>
        <Description>com Diego Fernandes</Description>
      </DescriptionContainer>
      <OkButton onPress={navigateToDashboard}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
