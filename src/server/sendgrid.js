const sgMail = require('@sendgrid/mail');

import createDebug from 'debug';
import config from './config';

const debug = createDebug('sendgrid');
sgMail.setApiKey(config.sendgridKey);

const sendTransactionalEmail = (origin, accessToken, toEmail, toName) => {
  const emailOptions = {
    from: {
      name: 'oneDeeds',
      email: 'info@oneDeeds.com',
    },
    to: {
      name: toName,
      email: toEmail,
    },
    replyTo: 'info@oneDeeds.com',
    subject: 'Please Verify Your Email Address',
    templateId: 'd-4b47ed3c434b49aaa594aa7a52aa09c8',
    dynamic_template_data: {
      name: toName,
      accessToken: `${accessToken}`,
      origin: origin,
    },
    categories: ['transactional'],
  };

  debug('Sending token via email...');
  return sgMail.send(emailOptions);
};

export default sendTransactionalEmail;
