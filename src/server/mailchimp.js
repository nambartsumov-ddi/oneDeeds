import Mailchimp from 'mailchimp-api-v3';
import createDebug from 'debug';

import config from './config';

const debug = createDebug('mailchimp');

const LIST_IDS = {
  activeUsers: config.maillchimpListActiveUsers,
};

const mailchimp = new Mailchimp(config.mailchimpApiKey);

async function subscribeUserToList({ email, name }) {
  const data = {
    merge_fields: {
      NAME: name,
    },
    email_address: email,
    status: 'subscribed',
  };

  const path = `/lists/${LIST_IDS.activeUsers}/`;

  mailchimp
    .post(path, { members: [data], update_existing: true })
    .then((response) => {
      // Error will be in response.errors[0].message
      if (response.errors.length) {
        debug(response.errors[0].message);
        return;
      }
      debug('User successfuly added to mailchimp list');
    })
    .catch((error) => {
      debug('Failed to add user to mailchimp list', error);
    });
}

async function unSubscribeUserFromList({ email, name }) {
  const data = {
    merge_fields: {
      NAME: name,
    },
    email_address: email,
    status: 'unsubscribed',
  };

  const path = `/lists/${LIST_IDS.activeUsers}/`;

  mailchimp
    .post(path, { members: [data], update_existing: true })
    .then((response) => {
      // Error will be in response.errors[0].message
      if (response.errors.length) {
        debug(response.errors[0].message);
        return;
      }
      debug('User successfuly unsubscribed from mailchimp list');
    })
    .catch((error) => {
      debug('Failed to unsubscribed user from mailchimp list', error);
    });
}

export { subscribeUserToList, unSubscribeUserFromList };
