import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import {
  styleMap,
  getBlockStyle,
  BLOCK_TYPES,
  BLOCK_TYPE_HEADINGS,
  BlockStyleControls
} from "./BlockStyles";

const style = {};

class StyleButton extends React.Component {

  onToggle = (e) => {
    e.preventDefault()

    this.props.onToggle(this.props.style)
  }

  render() {
    let className = "RichEditor-styleButton inline styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
        <span style={style} className={className} id={this.props.id || ""} onMouseDown={this.onToggle}>
        {this.props.label}
        </span>
    );
  }
}

export default StyleButton;