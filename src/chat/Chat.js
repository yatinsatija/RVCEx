import React, { useRef, useState } from "react";
import "./Chat.css";
import firebase from "firebase/app";
import { auth, firestore } from "../firebase/firebase.utils";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Chat(props) {
  const [user] = useAuthState(auth);

  return (
    <div className="CApp">
      <header>
        <h1>Global Chat</h1>
        <button
          style={{
            backgroundColor: "green",
            height: "30px",
            width: "100px",
            color: "white",
          }}
          onClick={() => props.history.push("/")}
        >
          Goto Home
        </button>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button style={{color:"white",backgroundColor:"#424242"}} className="sign-in button1" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="p1">
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button
      className="sign-out button1"
      type="button"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    // if(auth.currentUser){}
    const { uid, photoURL } = auth.currentUser;
    // console.log("In send message");

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    // console.log("Message sent to firebase")
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (<>
    <main className="main1">
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>
    </main>

    <form className="form1" onSubmit={sendMessage}>
      <input
        className="input1"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="say something nice"
      />

      <button className="button1" type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  </>);
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  if (auth.currentUser) {
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (<>
      <div className={`message ${messageClass}`}>
        <img
          className="img1"
          alt=""
          src={photoURL ||
            "https://api.adorable.io/avatars/23/abott@adorable.png"}
        />
        <p className="p1">{text}</p>
      </div>
    </>);
  } else {
    return (
      <SignIn />
    );
  }
}