# Recuperação de Senha

**RF**

- O usuário pode recuperar sua senha informando o seu e-amail;
- O usuário deve receber um e-mail com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar o Mailtrap para testar envios de e-mail em desenvolvimento.
- Utilizar o Amazon SES para envio em produção.
- O envio de emails deve acontecer em segundo plano.

**RN**

- O link enviado por e-mail deve resetar em duas horas;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar email, nome e senha.

**RN**
- Usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário precisa informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar sua senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que ouver um novo agendamento;
-O prestador deve poder listar as notificações não lidas.

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no mongodb;
-As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;
# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestados; 
- O usuário deve poder listar os horários de um dia especifico de um prestados; 
- O usuário deve poder realizar um novo agendamento com o prestador.

**RNF**

- A listagem de prestadores deve ser armazenado em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem está disponiveis entre 8h ás 18h(Primeiro ás 8h, Último as 19h);
- Usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um hórario que já passou;
- O usuário não pode agendar serviços consigo;
