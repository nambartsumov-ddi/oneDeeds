const sgMail = require('@sendgrid/mail');

import createDebug from 'debug';
import config from './config';

const debug = createDebug('sendgrid');
debug(config.sendgridKey);
sgMail.setApiKey(config.sendgridKey);

const sendTokenEmail = (origin, accessToken, toEmail) => {
  const emailOptions = {
    to: toEmail,
    from: 'yotamelkaslasy@gmail.com',
    subject: 'Access Link',
    text: `
Hello,

Access your account by clicking the following link:
${origin}/act-now/${accessToken}.

Enjoy the ride.
`,
  };

  debug('Sendin token via email...');
  sgMail.send(emailOptions).catch((err) => debug(err));
};

export default sendTokenEmail;
