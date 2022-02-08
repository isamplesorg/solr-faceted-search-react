import PropTypes from 'prop-types';
import React from "react";
import cx from "classnames";

class Result extends React.Component {


  renderValue(field, doc) {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);

    return value.join(", ");
  }


  // Highlight the search words in the result text.
  HighlightWords(field, text){
    if (field.type === 'text' && field.value !== undefined){
      // replace "&", "|", "(", ")", "*", "'", """ and duplicated whitespace with only one whitespace
      let values = field.value.replaceAll(/\&|\*|\(|\)|\||\"|\'/g,"").replaceAll(/\s+/g," ").split(" ");

      // split original text by search words insensitively by regex pattern
      // g is for regex global and i is for insensitive.
      values.map((value) => {
        let regex = new RegExp(value, "gi");
        text = text.split(regex).join("<span style='background-color:yellow;'>" + value + "</span>");
      })

    }

    // How to render HTML string in React: https://medium.com/@uigalaxy7/how-to-render-html-in-react-7f3c73f5cafc
    // dangerouslySetInnerHTML is to convert html string into react html object 
    return <span dangerouslySetInnerHTML={{__html: text}} />;
  }

  render() {
    const {bootstrapCss, doc, fields} = this.props;

    return (
      <li className={cx({"list-group-item": bootstrapCss})} onClick={() => this.props.onSelect(doc)}>
        <ul>
          {fields.filter((field) => field.field !== "*").map((field, i) =>
            <li key={i}>
              <label>{field.label || field.field}</label>
              {this.renderValue(field.field, doc)}
            </li>
          )}
        </ul>
      </li>
    );
  }
}

Result.propTypes = {
  bootstrapCss: PropTypes.bool,
  doc: PropTypes.object,
  fields: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

export default Result;
