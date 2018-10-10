const sgMail = require('@sendgrid/mail');

import createDebug from 'debug';
import config from './config';

const debug = createDebug('sendgrid');
debug(config.sendgridKey);
sgMail.setApiKey(config.sendgridKey);

const sendEmail = (origin, accessToken, toEmail) => {
  const emailOptions = {
    from: 'info@oneDeeds.com',
    to: toEmail,
    subject: 'Access Link',
    text: `
Hello,

Access your account by clicking the following link:
https://www.onedeeds.com/signup/verification/${accessToken}.


(dev: Origin: ${origin} Token: ${accessToken})

Enjoy the ride.
`,
  };

  debug('Sendin token via email...');
  return sgMail.send(emailOptions);
};

export default sendEmail;
