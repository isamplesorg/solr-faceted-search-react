import PropTypes from 'prop-types';
import React from "react";
import cx from "classnames";

class Result extends React.Component {


  renderValue(field, doc) {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);

    return value.join(", ");
  }

  render() {
    const {bootstrapCss, doc, fields} = this.props;
    const Withlink = ({field, link, children})=> (
        field.field === "id"?
        <a href={link}>{children}</a> :
        children
    );

    return (
      <li className={cx({"list-group-item": bootstrapCss})} onClick={() => this.props.onSelect(doc)}>
        <ul>
          {fields.filter((field) => field.field !== "*").map((field, i) =>
            <li key={i}>
              <label>{field.label || field.field}</label>
              <Withlink field={field} link={"https://n2t.net/" + this.renderValue(field.field, doc)}>
                {this.renderValue(field.field, doc)}
              </Withlink>
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
