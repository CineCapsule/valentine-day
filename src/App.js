import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ValentineDay from "./artifacts/contracts/ValentineDay.sol/ValentineDay.json";
import "./App.css";
//My generated images
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";
import img7 from "./img/7.png";
import img8 from "./img/8.png";
import img9 from "./img/9.png";
import img10 from "./img/10.png";

import "bootstrap/dist/css/bootstrap.min.css";

//Components import
import Header from "./components/Header";
import Footer from "./components/Footer";

//Address where the contract was deployed
const VDaddress = "0x4291b543E00Fb0e96f3e2D4653F1276d067057A6";

function App() {
  const [error, setError] = useState("");
  //Retrieves all information about NFTS
  const [data, setData] = useState({});
  const [account, setAccount] = useState([]);

  //Data will be retrieved when the user is logged in
  useEffect(() => {
    fetchData();
    getAccounts();
  }, []);

  async function getAccounts() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts);
      console.log(accounts[0]);
    }
  }

  async function fetchData() {
    //If the user is well connected with Metamask
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //We retrieve the instance of the contract
      const contract = new ethers.Contract(
        VDaddress,
        ValentineDay.abi,
        provider
      );
      try {
        //We retrieve the price of the NFT
        const cost = await contract.cost();
        //We retrieve the number of NFTS sold
        const totalSupply = await contract.totalSupply();
        const object = { cost: String(cost), totalSupply: String(totalSupply) };
        //We assign the created object to the SetData
        setData(object);
      } catch (err) {
        setError(err.message);
      }
    }
  }
  //To buy our NFTS
  async function mint() {
    if (typeof window.ethereum !== "undefined") {
      //Recover different accounts
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //Modify data in the blockchain
      const signer = provider.getSigner();
      //We create the instance of the contract
      const contract = new ethers.Contract(VDaddress, ValentineDay.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: data.cost,
          gasPrice: ethers.utils.parseUnits("1", "gwei"),
        };
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        //Update information after transaction
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }
  //Transfer money from the contract to the contract owner's address
  async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(VDaddress, ValentineDay.abi, signer);

      try {
        let overrides = {
          gasPrice: ethers.utils.parseUnits("1", "gwei"),
        };
        const transaction = await contract.withdraw(overrides);
        await transaction.wait();
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img1} alt="img1" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img2} alt="img2" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img3} alt="img3" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img4} alt="img4" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img5} alt="img5" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img6} alt="img6" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img7} alt="img7" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img8} alt="img8" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img9} alt="img9" />
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <img src={img10} alt="img10" />
            </div>
          </div>
        </div>
        <div className="buyNft">
          <h1>Mint a Valentine Day's PopCorn ! 🍿</h1>
          {error && (
            <p className="buy">
              {"To buy these Nfts please connect to the Fuse Mainnet network"}
            </p>
          )}
          <p className="count">{data.totalSupply} / 20</p>
          <p className="cost">
            Each PopCorn NFT costs ~$10 = ~9€ = {data.cost / 10 ** 18} FUSE (+
            0.00016 FUSE gas fee)
          </p>
          <button type="button" className="btn btn-danger" onClick={mint}>
            BUY 1 NFT
          </button>
          {account[0] === "0xde9693723b4d0ccc06eb73f5e6ce3b6dd555b504" && (
            <button type="button" className="btn btn-dark" onClick={withdraw}>
              Withdraw
            </button>
          )}
          <h1>Explore your Valentine Day's PopCorn ! 🍿</h1>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://explorer.fuse.io/token/0x4291b543E00Fb0e96f3e2D4653F1276d067057A6/inventory"
            title="Explorer"
          >
            <button type="button" className="btn btn-danger">
              At Fuse Explorer
            </button>
          </a>
          <h1>List your Valentine Day's PopCorn ! 🍿</h1>
          <p>Approval in progress by TofuNFT team ...</p>
          <p>
            From the My NFTs in the top right menu to see the NFTs in your
            wallet after connecting it.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://tofunft.com/discover/items?contracts=12935&network=122"
            title="TofuNFT"
          >
            <button type="button" className="btn btn-danger">
              At TofuNFT
            </button>
          </a>
        </div>
        {/* //Socials links// */}
        <div className="row kpx_row-sm-offset-3 kpx_socialButtons">
          <div className="col-xs-2 col-sm-2">
            <a
              href="https://twitter.com/cine_capsule"
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-block kpx_btn-twitter"
              data-toggle="tooltip"
              data-placement="top"
              title="Twitter"
            >
              <i className="fa fa-twitter fa-2x"></i>
              <span className="hidden-xs"></span>
            </a>
          </div>
          <div className="col-xs-2 col-sm-2">
            <a
              href="https://www.instagram.com/cine_capsule/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-block kpx_btn-instagram"
              data-toggle="tooltip"
              data-placement="top"
              title="Instagram"
            >
              <i className="fa fa-instagram fa-2x"></i>
              <span className="hidden-xs"></span>
            </a>
          </div>
          <div className="col-xs-2 col-sm-2">
            <a
              href="https://www.facebook.com/cinecapsuleofficial/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-block kpx_btn-facebook"
              data-toggle="tooltip"
              data-placement="top"
              title="Facebook"
            >
              <i className="fa fa-facebook fa-2x"></i>
              <span className="hidden-xs"></span>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
