import React from 'react';

export class DatabaseInteractions extends React.Component {
  render() {
    let collect_status = "NOT SET"
    if(this.props.collect) {
      collect_status = "Collecting"
    } else {
      collect_status = "Not Collecting"
    }
    return (
      <div>
        <h1>Database Interactions</h1>
        <button onClick={this.props.onCollect}>{collect_status}</button>
        {/* <button onClick={this.props.onQuery}>Query</button> */}
      </div>
    );
  }
}