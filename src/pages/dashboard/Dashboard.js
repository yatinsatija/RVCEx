import React from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import { firestore } from "../../firebase/firebase.utils";
import ItemCard from "./ItemCard";
import "./dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedJob: null,
      items: [],
      filteredItems: [],
      jobSearchText: "",
    };
  }

  async componentWillMount() {
    console.log(localStorage.getItem("currentUserEmail"));
    if (!localStorage.getItem("currentUserEmail")) {
      alert("Login to use dashboard");
      this.props.history.push("/signin");
    } else {
      const currentUserDocument = await firestore
        .doc(`users/${localStorage.getItem("currentUserEmail")}`)
        .get();
      const { tokens } = currentUserDocument.data();
      if (tokens < 5) {
        alert(
          "You don't have minimum tokens to view dashboard\nYou can get more tokens on adding any item of yours"
        );
        this.props.history.push("/myitems");
      }
    }
  }

  async f1() {
    const snapShot = await firestore.collection("items").get();
    const docsArray = snapShot.docs;
    const docsArrayData = docsArray.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return docsArrayData;
  }

  async functionFirebase() {
    var array = await this.f1();
    array = array.filter((doc) => doc.isAssigned === false);
    this.setState(
      Object.assign(this.state.items, { items: array, filteredItems: array })
    );
  }

  handleSearch = (event) => {
    this.setState({ jobSearchText: event.target.value }, () => {
      var __self = this;
      var updatedList = __self.state.items;
      updatedList = __self.state.items.filter(function (key) {
        console.log(key);
        return (
          key.itemName
            .toLowerCase()
            .search(__self.state.jobSearchText.toLowerCase()) !== -1
        );
      });

      this.setState({
        filteredItems: updatedList,
      });
    });
  };

  componentDidMount() {
    this.functionFirebase();
    console.log(this.state.items);
  }

  render() {
    return (
      <div>
        <h1 className="head">Find Items</h1>
        <FormControl>
          <TextField
            label="Search Jobs"
            value={this.state.jobSearchText}
            onChange={this.handleSearch}
            style={{ marginTop: "1%" }}
          />
        </FormControl>
        <Button
          className="btn"
          onClick={() => window.location.assign("/upload")}
        >
          +Add New Item
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.filteredItems.map((element, i) => {
            return (
              <div style={{ margin: "2% 1%" }}>
                <ItemCard event={element} key={i} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
