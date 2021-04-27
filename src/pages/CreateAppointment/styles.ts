import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

interface ProviderContainterProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
`;
export const EmptyButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const Content = styled.ScrollView`
  padding: 0px 24px;
`;

export const ProviersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)``;

export const ProviderContainer = styled.TouchableOpacity<
  ProviderContainterProps
>`
  background-color: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  padding: 8px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-right: 16px;
  border-radius: 10px;
  height: 48px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${props => (props.selected ? '#312e38' : '#f4ede8;')};
  font-family: 'RobotoSlab-Regular';
  font-weight: 500;
  font-size: 18px;
  margin-left: 8px;
  line-height: 24px;
`;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-weight: 500;
  font-size: 25px;
`;

export const ShowDatePickerToggle = styled.TouchableOpacity`
  background-color: #ff9000;
  flex-direction: row;
  border-radius: 10px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  height: 41px;
`;

export const ShowDatePickerToggleText = styled.Text`
  color: #000;
  font-family: 'RobotoSlab-Regular';
  font-weight: 500;
  font-size: 18px;
  margin-left: 8px;
  line-height: 24px;
`;

export const Schedule = styled.View`
  padding: 42px 0 16px;
`;

export const Section = styled.View`
  margin-top: 22px;
`;

export const SectionTitle = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
  margin-top: 12px;
`;

export const Hour = styled.TouchableOpacity<HourProps>`
  background-color: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  padding: 11px 10px;
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`;

export const CreateAppointmentButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  background-color: #ff9000;
  align-items: center;
  justify-content: center;
  margin-bottom: 55px;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`;
