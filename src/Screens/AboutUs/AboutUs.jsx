import React from 'react';
import { Col, Row } from 'reactstrap';
import styles from './AboutUs.module.scss';
import { Animated } from 'react-animated-css';

const AboutUs = () => {
  return (
    <div className={styles.main_about} id="aboutus">
      <Row>
        <Col sm={12} md={8}>
          <Animated
            isVisible={true}
            animationIn='animate__fadeInUpBig'
            animationOut='animate__fadeInUpBig'
          >
            <div className={styles.about_content}>
              <div>
                <h1>
                  ABOUT <span>US</span>
                </h1>
                <p>
                    <b>Stickman Diamond Club</b> is a collectible 3D NFT project. 
                    The Stickman is one of the most iconic internet characters,
                    being featured in a countless Flash movies, games and marketing 
                    throughout history.
                    We have create 3D Version of the stickman to bring the character
                    in the metaverse world. We have created the hundreds of traits like 
                    face, hats, dresses, weapon, etc.. in this way to cover
                    all the possible character in the world.
                </p>
              </div>
              <div>
                <h2>LONELY SOCIETY FOUNDATION</h2>
                <p>
                  A portion of the sales from the Stickman Diamond Club
                  collections will be used to put up a non-profit,
                  non-governmental organization (NGO) called Lonely Society
                  Foundation. The main goal of the NGO is to set up physical
                  clinics for those struggling with mental health problems and
                  to create a community that has the resource to guide the
                  youth.
                </p>
              </div>
              <div>
                <h2>METAVERSE READY</h2>
                <p>
                  Our NFT Characters are full body so the real use in the metaverse gaming character.
                  Real use in the metaverse for marketing and advertising your brand.
                  Now company can use their own character for marketing.
                </p>
              </div>
            </div>
          </Animated>
        </Col>
        <Col sm={12} md={4}>
          <Animated
            animationIn='animate__backInUp'
            animationOut='animate__backInUp'
            isVisible={true}
          >
            <div className={styles.sideBear}>
              <img src='Assets/sidebear.png' alt='sidebear' />
            </div>
          </Animated>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
