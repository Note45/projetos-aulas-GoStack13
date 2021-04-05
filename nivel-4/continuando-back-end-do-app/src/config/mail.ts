interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
      email: "teste_send_email@teste.com",
      name: "Teste de Envio de Email",
    },
  },
} as IMailConfig;
