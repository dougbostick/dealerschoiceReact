import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      partName: "",
      parts: [],
      selectedPart: null,
    };
  }

  async selectPartType(partName) {
    const response = await axios.get(`/api/${partName}`);
    console.log("select part type response", response);
    //const selectedPart = response.data;
    this.setState({
      parts: response.data,
      partName,
      // selectedPart,
    });
    console.log("state after SPT", this.state);
  }

  // async componentDidMount() {
  //   this.selectPartType("cpus");
  // }
  render() {
    console.log("rend");
    const items = this.state.parts.map((part) => {
      return (
        <li onClick={() => this.setState({ selectedPart: part })} key={part.id}>
          {part.name}
        </li>
      );
    });
    // the && makes sure the first half of the statement is true, before evaluating the second half
    const selectedPartInfo = this.state.selectedPart && (
      <div>
        {this.state.selectedPart.name} price:
        {this.state.selectedPart.price}
      </div>
    );

    return (
      <div>
        <div id="navbar">
          <div onClick={() => this.selectPartType("gpus")}>GPUS</div>
          <div onClick={() => this.selectPartType("cpus")}>CPUS</div>
          <div onClick={() => this.selectPartType("motherboards")}>
            Motherboards
          </div>
        </div>
        <h1>{this.state.partName}</h1>
        <ul>{items}</ul>
        {selectedPartInfo}
      </div>
    );
  }
}

export default App;
