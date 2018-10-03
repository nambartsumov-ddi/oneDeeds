import sgMail from '@sendgrid/mail';
import createDebug from 'debug';

const debug = createDebug('sendgrid');
debug(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendTokenEmail = (origin, accessToken, toEmail) => {
  const emailOptions = {
    to: toEmail,
    from: 'oneDeeds.com',
    subject: 'Access Link',
    html: `
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
