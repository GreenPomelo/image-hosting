import React, { Component } from "react";
import Navigate from "../src/components/navigate";
import "../src/style/app.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <QyLogin /> */}
        <Navigate />
      </div>
    );
  }
}

export default App;
