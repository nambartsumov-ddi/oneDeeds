import React from 'react';
import classNames from 'classnames';

import styles from './FAQ.module.scss';
import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const FAQ = () => {
  const FAQContentClasses = stylesCtx(styles.ContentWrapper);

  return (
    <div className={styles.FAQ}>
      <div className={styles.FixedHeader} />
      <NavToggle page="FAQ" />
      <Logo />
      <Layout>
        <div className={FAQContentClasses}>
          <div className={styles.FAQPageContent}>
            <div className={styles.FAQTitle}>
              <h1>
                Frequently Asked <span>Questions</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.FAQImg} />
          </div>
          <div className={styles.Content}>
            <div className={styles.Question}>
              <span>Q</span>: What if I don’t want to or can’t complete the deed assigned for the month?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: We understand that some months are busier than others, just make sure to complete the deed
              the following month.
            </div>
            <div className={styles.Question}>
              <span>Q</span>: Can I choose which charity my money goes to?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: Definitely. We would love to hear your suggestions, so feel free to get in touch with us
              and put in a request. You can also see the list of charities we work with on the “Donations” page.
            </div>
            <div className={styles.Question}>
              <span>Q</span>: Do I need to pay to be a part of the OneDeeds community?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: It costs just $1 a month to be a part of our community. A portion of that money gets
              donated to a different charity every month – one more way we’re making the world a better place.
            </div>
            <div className={styles.Question}>
              <span>Q</span>: Can I suggest good deeds for the community?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: Yes, please send us your suggestions - we&#39;re all ears!
            </div>
            <div>
              <span>Q</span>: How do I unsubscribe?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: You can easily unsubscribe directly from the Emails you get from us (Through the
              unsubscribe link at the button of the mails we send you). You can also send us a request to
              info@onedeeds.com and we will handle it.
            </div>
            <div>
              <span>Q</span>: Is my payment information secured?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: Absolutely, We work with a 3rd party payment system, Stripe. Stripe holds the highest
              level of online payment security. For more information please visit{' '}
              <a href="https://www.stripe.com" rel="noopener noreferrer" target="_blank">
                Stripe
              </a>
              .
            </div>
            <div>
              <span>Q</span>: You haven&#39;t received your monthly deeds or summery email?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: We send out the list of the monthly deeds with an email at the beginning of every month or
              on the same day you signed up. The Summery email is sent at the end of each month. If you have not
              received the deeds or summery email please look for it under promotions, junk or others.
            </div>

            <div>
              <span>Q</span>: What should I look for after becoming a member?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: After becoming a member you should get a verification and welcome email. Each member will
              receive a list of deeds in the monthly deed email that is sent on the same day of signing up or at the
              begining of each month. At the end of each month each member will also receive a summery email of the
              community&#39;s achievements.
            </div>

            <div className={styles.Question}>
              <span>Q</span>: How can I stop paying the membership fee?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: The membership fee goes partly to donations and the rest to support our activity. If you
              wish to stop paying simply do one out of the two following options:
              <ol>
                <li>
                  Click on the tool bar on our site. Then click on {'"Cancel Membership"'}. If you {"don't"} have an
                  option to click on {'"Cancel Membership"'} start the signup with the same email you signed-up with,
                  then the option to {'"Cancel Membership"'} will appear.
                </li>
                <li>
                  Send us an email to <a href="mailto:info@onedeeds.com">info@onedeeds.com</a> and we will cancel your
                  membership for you.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FAQ;
