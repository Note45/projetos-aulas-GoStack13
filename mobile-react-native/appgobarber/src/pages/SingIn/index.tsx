import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SingIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="Email" />

      <Input name="password" icon="lock" placeholder="Senha" />

      <Button
        onPress={() => {
          console.log('Press button');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SingIn;
