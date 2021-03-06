import React, { useState } from 'react';
import { Form } from '@unform/web';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '../../components/form/Input';
import {
  Button,
  Container,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from '../../components/ui';
import Provider from '../../components/template/Provider';
import api from '../../api/axios';
import logo from '../../assets/logo-type.png';

const ForgotPassword = () => {
  const [, setError] = useState(false);
  const [sended, setSended] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ identifier }) => {
    try {
      setLoading(true);
      await api.post('/auth/recover-password-request', { identifier });
      setLoading(false);
      setSended(true);
    } catch (err) {
      setError(true, { message: err.message });
    }
  };

  return (
    <Provider>
      <Container>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to="/">
            <img src={logo} alt="AncapHub" />
          </Link>
          <Card style={{ width: '100%', maxWidth: 400, marginTop: 32 }}>
            <CardHeader title="Recuperar Senha" />
            <CardBody>
              {!loading ? (
                <>
                  {!sended ? (
                    <>
                      <p style={{ textAlign: 'center', marginBottom: 16 }}>
                        Digite seu endereço de email ou nome de usuário para que
                        possamos lhe enviar o e-mail com o link de recuperação
                      </p>
                      <Form onSubmit={handleSubmit}>
                        <Input
                          icon={FiUser}
                          name="identifier"
                          placeholder="E-mail ou nome de usuário"
                        />
                        <Button
                          fullWidth
                          color="secondary"
                          type="submit"
                          style={{ marginTop: 16 }}
                        >
                          Enviar e-mail
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <p>
                      Enviamos um e-mail de recuperação para sua conta.
                      Certifique-se de aguardar alguns minutos e verificar a
                      caixa de spam. Caso ele não chegue talvez você tenha
                      digitado os dados incorretos.
                    </p>
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spinner />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </Container>
    </Provider>
  );
};

export default ForgotPassword;
