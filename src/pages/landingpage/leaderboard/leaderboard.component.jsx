import React from "react";
import "./leaderboard.styles.scss"
import PropTypes from 'prop-types';
import { firestore } from "../../../firebase/firebase.utils";
class Leaderboard extends React.Component {
    constructor() {
      super();
      this.state = {
        // user: localStorage.getItem("employer"),
        selectedJob: null,
        items: [],
        //   jobs: [],
        filteredItems: [],
        jobSearchText: "",
      };
      this._clickAllTime = this._clickAllTime.bind(this);
      this._clickRecent = this._clickRecent.bind(this);
    }
    async f1() {
      const snapShot = await firestore.collection("users").get();
      const docsArray = snapShot.docs;
      const docsArrayData = docsArray.map((doc) => doc.data());
      return docsArrayData;
    }
    async functionFirebase() {
      const array = await this.f1();
      // console.log(array);
      array.sort((a,b) => b.tokens - a.tokens);
      this.setState(
        Object.assign(this.state.items, { items: array, filteredItems: array })
      );
      
    }
  
    componentDidMount() {
      this.functionFirebase();
    console.log(this.state.items);
    }
  
    _clickAllTime(e) {
      let sorted = this.state.filteredItems.sort((a, b) => b.alltime - a.alltime);
      this.setState(sorted);
    }
  
    _clickRecent(e) {
      let sorted = this.state.filteredItems.sort((a, b) => b.recent - a.recent);
      this.setState(sorted);
    }
  
    render() {
      // {this._clickAllTime()};
      
        
      
    
      let userlist = this.state.filteredItems.map((user, i) => <User username={ user.name } rank={ i + 1 }  key={i+1} alltime={ user.tokens } />);
  
      return (
        <div className="container">
          <LeaderboardHeader />
          <ColumnHeader onClickAll={this._clickAllTime} onClick={this._clickRecent}/>
          { userlist }
        </div>
      )
    }
  
  }
  
  const LeaderboardHeader = () => {
    return (
      <div className="leadheader">
          <h2>Leaderboard</h2>
      </div>
    )
  }
  
  const ColumnHeader = ({
    onClick,onClickAll}) => (
    <div className="row colheader">
        <div className="col-xs-1">
          <h4>#</h4>
        </div>
        <div className="col-xs-5">
          <h4>Name</h4>
        </div>
        <div className="col-xs-3 recent">
          <h4  >Tokens</h4>
        </div>
        
      </div>
  );
   
  
  ColumnHeader.propTypes = {
    onClick: PropTypes.func,
    onClickAll: PropTypes.func,
  }
  
  const User = ({ rank, img, username, recent, alltime }) => {
    return (
    
      <div className="row colheader">
        <div className="col-xs-1">
          <h4>{rank}</h4>
        </div>
        <div className="col-xs-5">
          <h4>{username}</h4>
        </div>
        <div className="col-xs-3 recent">
          <h4  >{alltime}</h4>
        </div>
        
      </div>
    )
  }
  
  
  
  export default Leaderboard;