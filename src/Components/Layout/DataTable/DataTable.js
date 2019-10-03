import React, { Component } from "react";
import MaterialTable from "material-table";
import CommentList from "../../Comments/CommentList";
import "./DataTable.css";
import axios from "axios";
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {
      channelName: "Fox 8",
      columns: [
        {
          title: "Title",
          field: "title"
        },
        { title: "Air Date", field: "airdate" },
        { title: "Air Time", field: "airtime" },
        { title: "Nominal Duration", field: "nominalDuration" },
        { title: "Media ID", field: "mediaId" },
        { title: "Sesason #", field: "seasonNum" },
        { title: "Episode #", field: "episodeNum" },
        { title: "Episode Title", field: "episodeTitle" },
        {
          title: "Captiion Status",
          field: "captionStatus",
          lookup: {
            Captioned: "Captioned",
            Subtitled: "Subtitled",
            "Captions Exempt": " Captions Exempt",
            "Captions did not TX": "Captions did not TX"
          }
        }
      ],
      data: []
    };
  }

  addComment(comment, id) {
    console.log("Comment created::", comment);
    console.log("id::", id);
    let newData = this.state.data.map(c => {
      if (c.id === id) {
        let comments = [comment, ...c.comments];
        return { ...c, comments };
      }
      return c;
    });
    this.setState(st => ({
      data: newData
    }));
  }
  async componentDidMount() {
    console.log("Component did Mount!", this.props.dataSet);
    if (
      this.props.dataSet["minDate"] !== null &&
      this.props.dataSet["maxDate"] !== null &&
      this.props.dataSet["channel"] !== "none"
    ) {
      let response = await axios.get("mockData.json");
      let responseData = response.data;
      console.log("Response::", responseData);
      this.setState({
        data: [...responseData]
      });
    }
  }

  render() {
    return (
      <MaterialTable
        title={this.props.dataSet["channel"]}
        columns={this.state.columns}
        data={this.state.data}
        detailPanel={[
          {
            tooltip: "Show Comments",
            render: rowData => {
              //console.log("Row Data::", rowData["comments"][0]["message"]);
              return (
                <div>
                  <h1>
                    <CommentList
                      id={rowData.id}
                      addComment={this.addComment}
                      comments={rowData.comments}
                    />
                  </h1>
                </div>
              );
            }
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log("nedata::", newData);
              console.log("oldData::", oldData);
              let oldDate = new Date(oldData.airdate);
              let newDate = new Date(newData.airdate);
              console.log("nedata::", newDate);
              console.log("oldData::", oldDate);

              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;

                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}

export default DataTable;
