import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContaier,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProviderListTitle,
} from './styled';

export interface Provider {
  id: string;
  name: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [navigate]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

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

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContaier
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContaier>
        )}
      />
    </Container>
  );
};

export default Dashboard;
