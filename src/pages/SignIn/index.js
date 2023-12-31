import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, GithubButton } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import { signUp } from '../../services/userApi';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const response = await api.post('/auth/login', { code });
      const user = response.data;
      try{
        const hasLogin = await signIn(user.email, (user.id).toString());
        setUserData(hasLogin);
      }catch{
        await signUp(user.email, (user.id).toString()); //email e password
        setUserData(await signIn(user.email, (user.id).toString()));
      }
      setTimeout(() => navigate('/dashboard/subscription'), 5);
    }
  };

  function github() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '1d9e79555d6221240ef3';
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000/sign-in'
    });

    const authURL = `${GITHUB_URL}?${params.toString()}`;
    window.location.href = authURL;
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <GithubButton onClick={() => github()}>Login com GitHub</GithubButton>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
