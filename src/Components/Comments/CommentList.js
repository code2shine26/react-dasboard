import React, { Component } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import "./CommentList.css";
class CommentList extends Component {
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
    console.log("Method invoked");
    const items = document.querySelectorAll("#timeline li");
    items.forEach(item => {
      if (this.inInViewPort(item)) {
        item.classList.add("show");
      }
    });
  }
  componentDidMount() {
    console.log("Comment list mounted");
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("load", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  }
  render() {
    console.log("Badri::", this.props.comments);
    return (
      <div className="CommentList">
        <CommentForm id={this.props.id} addComment={this.props.addComment} />
        <Comments comments={this.props.comments} />
      </div>
    );
  }
}

export default CommentList;
