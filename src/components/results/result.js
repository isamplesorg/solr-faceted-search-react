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

    return (
      <tr className="list-table">
      <li className={cx({ "list-group-item": bootstrapCss })} onClick={() => this.props.onSelect(doc)}>
        <ul>
          {fields.filter((field) => field.field !== "*" && field.hidden !== true).map((field, i) =>
            <li key={i}>
              <td className="list-table">
              <label>{field.label || field.field}</label>
              </td>
              <td className="list-table">
              <ResultWrapper field={field} value={this.renderValue(field.field, doc)} />
              </td>
            </li>
          )}
        </ul>
      </li>
      </tr>
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
