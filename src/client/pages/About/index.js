import React from 'react';
import classNames from 'classnames';

import styles from './About.module.scss';
import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import SignupCallToAction from 'Components/SignupCallToAction';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const About = () => {
  const AboutContentClasses = stylesCtx(styles.ContentWrapper);

  return (
    <div className={styles.About}>
      <div className={styles.FixedHeader} />
      <NavToggle page="about" />
      <Logo />

      <Layout>
        <div className={AboutContentClasses}>
          <div className={styles.AboutPageContent}>
            <div className={styles.AboutTitle}>
              <h1>
                About The <span>Cause</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.AboutImg} />
            <div className={styles.Content}>
              <div className={styles.AboutUsContent}>
                <p>
                  Most people want to better the world and make a positive impact. They want to uplift their communities
                  and put smiles on people’s faces. Unfortunately though, the majority of people think that they can’t
                  make a difference by themselves.
                </p>

                <p>This common misconception is where we got the idea for OneDeeds.</p>

                <p>
                  Here at OneDeeds, we believe that all it takes to change the world is a community. By building a
                  community of people and giving every individual member the same good deed to complete every month,
                  we’re making a huge overall impact.
                </p>

                <p>It’s simple math: 1 + 1 = 3</p>
              </div>
            </div>
          </div>
          <div className={styles.BottomContent}>
            <div className={styles.OurVisionContent}>
              <h3>Our Vision</h3>

              <p>
                Everyone wants to change the world. Everyone wants to see a happier tomorrow, a brighter future and a
                better life for all.
              </p>

              <p>We are with you.</p>

              <p>
                Our vision is to get the do-ers and the change-makers of the world together to make things happen. With
                a strong community and good deeds - we can change the world!
              </p>
            </div>
            <div className={styles.Team}>
              <h3>Team</h3>
              <div className={styles.TeamWrapper}>
                <div className={styles.Team1}>
                  <h4>Asaf Rozengarten</h4>

                  <p>
                    Asaf holds a B.A. in Business Management from the IDC (Interdisciplinary Center), as well as an
                    Executive International MBA from Northwestern University – Kellogg-Recanati.
                  </p>

                  <p>
                    He has 7 years of experience building online marketing operations for startups and consults for
                    companies on their marketing strategies.
                  </p>
                </div>
                <div className={styles.Team2}>
                  <h4>David Zak</h4>

                  <p>
                    David holds a B.Sc. in Industrial Engineering, specializing in information systems from SCE College.
                  </p>

                  <p>
                    He has 5 years of experience working within project management, operations, and supply chain
                    management. Additionally, David has worked as a system analyst to understand user requirements and
                    system implementations.
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.BoldSentence}>
              Together with our community who are an inseparable part of who we are, we will make the change.
            </p>
            <SignupCallToAction className={styles.AboutSignup} page="about" />
            <div className={styles.Contact}>
              <h3>Contact</h3>
              <p>Got a question? We’d love to hear from you!</p>
              <a
                href="mailto:Info@onedeeds.com"
                rel="noopener noreferrer"
                target="_blank"
                className={styles.OnedeedsMail}>
                Info@onedeeds.com
              </a>
              <p>Valley Cottage, NY 10989</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
