import React, { Component } from "react";
import "./CommentForm.css";
import uuid from "uuid/v4";

const users = ["Admin", "Sam", "Badri", "Alex"];
class CommentsForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: uuid(),
      message: "",
      user: users[Math.floor(Math.random() * users.length)],
      created: new Date().toDateString()
    };
  }

  handleInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addComment(this.state, this.props.id);
    this.setState({
      id: uuid(),
      message: "",
      user: users[Math.floor(Math.random * users.length)],
      created: new Date().toDateString()
    });
  }
  render() {
    return (
      <form className="CommentsForm" onSubmit={this.handleSubmit}>
        <textarea
          name="message"
          placeholder="Comment"
          value={this.state.message}
          onChange={this.handleInputChange}
          required
        ></textarea>
        <button id="commentbtn">Add Comment</button>
      </form>
    );
  }
}

export default CommentsForm;
