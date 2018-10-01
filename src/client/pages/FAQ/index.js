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
              <span>A</span>: It costs just $1 a month to be a part our community. A portion of that money gets donated
              to a different charity every month – one more way we’re making the world a better place.
            </div>
            <div className={styles.Question}>
              <span>Q</span>: Can I suggest good deeds for the community?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: Yes, please send us any suggestions that you have – we’re all ears!
            </div>
            <div>
              <span>Q</span>: How do I unsubscribe?
            </div>
            <div className={styles.Answer}>
              <span>A</span>: Simply enter the email address you have subscribed to and you will receive an email to
              unsubscribe
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FAQ;
