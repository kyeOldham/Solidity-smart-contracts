import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core"
import { injected } from "./wallet/Connectors";
import metamaskIcon from '../image-551.png';

function Start() {
  const { active, account, activate, deactivate } = useWeb3React()
  const history = useHistory();
  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('contacts', "[]");
      history.push('/contacts');
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="App" id="start-page">
      <img src={metamaskIcon} className="big-img" id="wolf" alt="icon" />
      <div className="title-desc">
        <h1 className="home-title">Crypto Address book</h1>
        <p className="text">The easiest and quickest way to manage and pay your contacts.
        Connect your wallet to begin.</p>
      </div>
      <div className="connect-metamask">
        {active ? <span>Connected with <b>{account}</b> 
        <button className="main-btn" onClick={disconnect}>Disconnect</button> </span> : 
        <button className="main-btn" onClick={connect}><span className="label">Connect Wallet</span></button>}
        {/* <Link to="/contacts">View Contacts</Link> */}
        </div>
    </div>
  )
}


export default Start;
