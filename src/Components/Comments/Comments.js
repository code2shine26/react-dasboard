import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@material-ui/core/Badge";
import {
  faCoffee,
  faChevronRight,
  faUserCircle,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import "./Comment.css";
class Comments extends Component {
  render() {
    let message = this.props.comments.map(c => {
      return (
        <li key={c.user}>
          <div>
            <h4 className="User">
              <FontAwesomeIcon icon={faUserCircle} /> {c.user}
            </h4>
            <p className="createdDate">
              {" "}
              <FontAwesomeIcon icon={faCalendar} /> {c.created}
            </p>

            <p className="messageText">{c.message}</p>
          </div>
        </li>
      );
    });
    return (
      <div className="Comments">
        <section id="timeline">
          <div className="CommentTitle">
            <h3>Comment Log{"    "}</h3>
            <div className="Number-of-comments">
              {this.props.comments ? this.props.comments.length : 0}
            </div>
          </div>

          <ul>{message}</ul>
        </section>
      </div>
    );
  }
}

export default Comments;
