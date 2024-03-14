import React, {useState} from 'react';
// import { Col, Row } from 'reactstrap';
import { Col, Row } from 'antd';
// import SliderComponent from '../../Components/Slider/Slider';
import styles from './Mint.module.scss';
import {
    ToastContainer,
    toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    ethers, BigNumber
} from "ethers";

import {
    useWeb3React
} from "@web3-react/core";

import {
    Contract,
    API_URL
} from "./Config";

const Mint = () => {
    const {
        account
    } = useWeb3React();

    const [quantity, setQuantity] = useState(1);

    const increaseCount = () => {
        if(quantity < 10) {
            setQuantity(quantity + 1)
        }
    }

    const decreaseCount = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const notifymessage = (msg, type) => {
        toast(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type,
            theme: "dark"
        });
    }

    const mintNFT = async () => {
        if(account ==  undefined) {
            notifymessage("Please connect the wallet", "error");
            return;
        }
        const chainId = 4; // 1: ethereum mainnet, 4: rinkeby
        console.log("current", window.ethereum.networkVersion)
        if (window.ethereum.networkVersion !== chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x4' }] // 0x4 is rinkeby. Ox1 is ethereum mainnet.
                });
            } catch (err) {
                notifymessage("Please check the Ethereum mainnet", "error");
                return false;
            }
        }
        const signer = new ethers.providers.Web3Provider(
            window.ethereum
        ).getSigner();
        const contract = new ethers.Contract(
            Contract.address,
            Contract.abi,
            signer
        );
        const isPause = await contract.isPause();
        if(isPause) {
            notifymessage("Mint is Paused now!")
        } else {
            const isPreSaleEnabled = await contract.isPreSaleEnabled();
            if(isPreSaleEnabled) {
                notifymessage("PreMint is opening right now!")
                const presaleTokenPrice = await contract.presaleTokenPrice();
                try {
                    const options = {
                        value: BigNumber.from(presaleTokenPrice).mul(quantity),
                        from: account,
                    };
                    const res = await contract.preSaleToken(quantity, options);
                    notifymessage("Mint success!", "success")
                } catch (err) {
                    notifymessage("PreMint failed! Please check your wallet.", "error")
                }
            } else {
                notifymessage("Public Mint is opening right now!")
                const tokenPrice = await contract.tokenPrice();                
                try {
                    const options = {
                        value: BigNumber.from(tokenPrice).mul(quantity),
                        from: account,
                    };
                    const res = await contract.mintToken(quantity, options);
                    notifymessage("Mint success!", "success")
                } catch (err) {
                    notifymessage("Public Mint failed! Please check your wallet.", "error")
                }
            }
        }
    }

    return (
        <>
            <div className={styles.mint}>
                <div className={styles.mint_head}>
                    <h2>
                    Min<span>t&nbsp;Stickm</span>an
                    </h2>
                </div>
                <Row className={styles.selectnumber} justify="center" >
                    <Col md={3} sm={5} xs={8}>
                        <h3 className={styles.minus} onClick={() => decreaseCount()} >-</h3>
                    </Col>
                    <Col md={3} sm={5} xs={8}>
                        {
                            (quantity === 10) ? <h3 className={styles.count}>1<span>0</span></h3>
                                            : <h3 className={styles.count}>{quantity}</h3>
                        }
                    </Col>
                    <Col md={3} sm={5} xs={8}>
                        <h3 className={styles.plus} onClick={() => increaseCount()} >+</h3>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col md={6} sm={24} xs={24}>
                        <button onClick={mintNFT}>
                            <span>&nbsp;Mint</span>
                        </button>
                    </Col>
                </Row>
            </div>
            <ToastContainer
                className={styles.toast}
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </>
        
    )
}
export default Mint;