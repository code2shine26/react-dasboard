import React, { Component } from "react";
import "./App.css";
import Main from "./Components/Main/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  inInViewPort(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  handleScroll() {
    const items = document.querySelectorAll("#timeline li");
    items.forEach(item => {
      if (this.inInViewPort(item)) {
        item.classList.add("show");
      }
    });
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("load", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
