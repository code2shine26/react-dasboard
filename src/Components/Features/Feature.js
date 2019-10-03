import React, { Component, Fragment } from "react";
import "./Feature.css";
class Fetaure extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <section id="home-c" class="text-center py-2">
          <div class="container">
            <h2 class="section-title">My Creative Process</h2>
            <div class="bottom-line"></div>
            <p class="lead">
              All of my UI/UX and design projects are based off a parcticed
              formula to get the result that i am looking for
            </p>
            <div class="process">
              <div>
                <i class="fas fa-file-alt fa-4x process-icon my-2">
                  <div class="process-step">1</div>
                </i>
                <h3>Discuss the Project</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                  distinctio quos a voluptatibus odit culpa?
                </p>
              </div>
              <div>
                <i class="fas fa-desktop fa-4x process-icon my-2">
                  <div class="process-step">2</div>
                </i>
                <h3>Brainstorming and Concepts</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                  distinctio quos a voluptatibus odit culpa?
                </p>
              </div>
              <div>
                <i class="fas fa-object-ungroup fa-4x process-icon my-2">
                  <div class="process-step">3</div>
                </i>
                <h3>UI/UX planning</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                  distinctio quos a voluptatibus odit culpa?
                </p>
              </div>
              <div>
                <i class="fas fa-thumbs-up fa-4x process-icon my-2">
                  <div class="process-step">4</div>
                </i>
                <h3>Interaction</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                  distinctio quos a voluptatibus odit culpa?
                </p>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Fetaure;
