import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Heading from '../Heading/Heading';
import Works from '../Works/Works';
import Line from '../../Components/Line/Line';
import Team from '../Team/Team';
import RightLine from '../../Components/RightLine/RightLine';
import RoadMap from '../RoadMap/RoadMap';
import Faqs from '../Faqs/Faqs';
import Partners from '../Partners/Partners';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

const MainHome = () => {
    const getLibrary = (provider) => {
        const library = new Web3Provider(provider, 'any')
        library.pollingInterval = 15000
        return library
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Home>
            <div>
                <Heading />
                <AboutUs />
                <Works />
                {/* <Mint /> */}
                <Line />
                <Team />
                <RightLine />
                <RoadMap />
                <Line />
                <Faqs />
                <RightLine />
                <Partners />
                <Footer />
            </div>
            </Home>
        </Web3ReactProvider>
    );
};

export default MainHome;
