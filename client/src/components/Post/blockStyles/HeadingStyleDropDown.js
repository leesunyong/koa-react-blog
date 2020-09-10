import React from "react";

class HeadingStyleDropDown extends React.Component {

  onToggle = (event) => {
    let value = event.target.value
    this.props.onToggle(value)
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span>
      <select value={this.props.active} onChange={this.onToggle}>
        <option value=''>Heading Levels</option>
        {this.props.blockTypeHeadings.map((heading, index) => {
          return <option key={index} className={className} value={heading.style}>{heading.label}</option>
        })}
      </select>
    </span>
    )
  }
}

export default HeadingStyleDropDown