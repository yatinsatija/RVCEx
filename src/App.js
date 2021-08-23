// import logo from './logo.svg';
import React from "react";
import "./App.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import { auth } from "./firebase/firebase.utils";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/signin-signup/signin-signup.component";
import Dashboard from "./pages/dashboard/Dashboard";
import MyItems from "./pages/my-items/my-items.component";
import Checkout from "./pages/uploading/Checkout.component";
import Chat from "./chat/Chat";
import Landing from "./pages/landingpage/landingpage.component";
class App extends React.Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("In onAuthStateChanged");
      if (userAuth) {
        console.log(userAuth.email);
        localStorage.setItem("currentUserEmail", userAuth.email);
        this.setState({ currentUser: userAuth });
      } else {
        localStorage.removeItem("currentUserEmail");
        this.setState({ currentUser: userAuth });
        console.log("someone logged out or nobody is logged in");
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;
    // console.log("currentUser: ",currentUser)
    return (
      <div className="App">
        {this.props.location.pathname !== "/chat" ? (
          <Header currentUser={currentUser} />
        ) : (
          <></>
        )}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signin" component={SignInSignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/myitems" component={MyItems} />
          <Route path="/upload" component={Checkout} />
          <Route path="/chat" component={Chat} />
          {/* <Route path="/landing" component={Landing} /> */}
        </Switch>
      </div>
    );
  }
}
// import Landing from "./pages/landingpage/landingpage.component";

// function App() {
//   return (
//     <div className="App">
//       {/* <h1>RVCEx</h1> */}
//       <Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/signin" component={SignIn} />
//         <Route path="/dashboard" component={Dashboard} />
//         <Route path="/upload" component={Checkout} />
//         <Route path="/landing" component={Landing} />
//       </Switch>
//     </div>
//   );
export default withRouter(App);
