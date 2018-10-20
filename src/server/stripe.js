import stripe from 'stripe';
import config from './config';

// const PLAN_ID = dev ? process.env.Stripe_Test_PlanId : process.env.Stripe_Live_PlanId;
// const ENDPOINT_SECRET = process.env.Stripe_Live_EndpointSecret;

const stripeInstance = new stripe(config.payMethod.stripeApiKey);

function createCustomer({ token, teamLeaderEmail, teamLeaderId }) {
  return stripeInstance.customers.create({
    description: 'Stripe Customer at async-await.com',
    email: teamLeaderEmail,
    source: token,
    metadata: {
      teamLeaderId,
    },
  });
}

function createSubscription({ customerId, teamId, teamLeaderId }) {
  logger.debug('stripe method is called', teamId, teamLeaderId);
  return stripeInstance.subscriptions.create({
    customer: customerId,
    items: [
      {
        plan: PLAN_ID,
      },
    ],
    metadata: {
      teamId,
      teamLeaderId,
    },
  });
}

function cancelSubscription({ subscriptionId }) {
  logger.debug('cancel subscription', subscriptionId);
  return stripeInstance.subscriptions.del(subscriptionId, { at_period_end: false });
}

function verifyWebHook(request) {
  const event = stripeInstance.webhooks.constructEvent(
    request.body,
    request.headers['stripe-signature'],
    ENDPOINT_SECRET
  );
  return event;
}

function stripeWebHooks({ server }) {
  server.post(
    '/api/v1/public/stripe-invoice-payment-failed',
    bodyParser.raw({ type: '*/*' }),
    async (req, res, next) => {
      try {
        const event = await verifyWebHook(req);
        logger.info(event.id);
        const { subscription } = event.data.object;
        logger.info(JSON.stringify(subscription));
        await Team.cancelSubscriptionAfterFailedPayment({
          subscriptionId: JSON.stringify(subscription),
        });

        res.sendStatus(200);
      } catch (err) {
        next(err);
      }
    }
  );
}

function getListOfInvoices({ customerId }) {
  logger.debug('getting list of invoices for customer', customerId);
  return stripeInstance.invoices.list({ customer: customerId });
}

export { createCustomer, createSubscription, cancelSubscription, stripeWebHooks, getListOfInvoices };
