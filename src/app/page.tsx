'use client';

import { useState, useEffect } from 'react';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

import styles from '../styles/index.module.scss';

export default function Home() {

  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');

  // Decrypted messages
  const [messages, setMessages] = useState([]);

  // Encrypted messages
  const [ledger, setLedger] = useState([
    'U2FsdGVkX1/y7AfRMBxEa6xpBedS8wb9rylQo3Ezfg0='
  ]);

  function OnPageLoad() {
    LedgerDecrypt();
  }

  function LedgerDecrypt() {
    let _messages = []
    for (let i = 0; i < ledger.length; i++) {
      let enc = ledger[i];
      let bytes = AES.decrypt(enc, secret);
      let text = bytes.toString(CryptoJS.enc.Utf8);

      if (text == '') {
        // Filter out

        // _messages.push(ledger[i]);
        continue
      }

      _messages.push(text);
    }
    setMessages(_messages);
  }

  function HandleSecretChange(event:object) {
    setSecret(event.target.value);
    return LedgerDecrypt();
  }

  function HandleMessageChange(event:object) {
    setMessage(event.target.value);
  }

  function Send() {
    // Commit message to ledger
    // Encrypt message
    const text = AES.encrypt(
      JSON.stringify(message), 
      secret
    ).toString();

    setLedger(ledger => [...ledger, text])
  }

  useEffect(() => {
    OnPageLoad();
  });

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.chat_wrapper}>

          <div className={styles.secret_wrapper}>
            <h2>pls, feds, dont epstein me, uwu</h2>
          </div>

          <div className={styles.chat}>
            {messages.map(function(d) {
              return (<div>{d}</div>)
            })}
          </div>

          <div className={styles.secret_wrapper}>
            <input 
            type="text" 
            placeholder="secret" 
            onChange={HandleSecretChange}
            className={styles.secret_box}
            />

          </div>

          <div className={styles.control_wrapper}>
            <input 
            type="text" 
            placeholder="Message" 
            onChange={HandleMessageChange}
            className={styles.message_box}
            />

            <button className={styles.submit_button} onClick={Send}>Send!</button>
          </div>

        </div>
      </div>
    </main>
  )
}
