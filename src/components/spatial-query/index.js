import PropTypes from 'prop-types';
import React from "react";
import cx from "classnames";

class SpatialQuery extends React.Component {
  constructor(props) {
    super(props);

    // We use empty string as the placeholders for each fields.
    // we should not use 0 or other numbers as the default/empty values
    // because numbers always mean location.
    // In deed, each field store number value.
    // The handleChange methood will check if the enter is legel.
    this.state = {
      min_lat: "",
      min_lon: "",
      max_lat: "",
      max_lon: "",
      error: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // update the state before rendering
  componentWillReceiveProps(nextProps) {
    if(Array.isArray(nextProps.value) || !nextProps || !nextProps.hasOwnProperty('value')){
      this.setState({
        min_lat: "",
        min_lon: "",
        max_lat: "",
        max_lon: "",
        error: "",
      })
      return
    }
    this.setState(nextProps.value);
  }

  handleSubmit(event) {
    // make sure the users enter all fields
    for (const [key, value] of Object.entries(this.state)) {
      // check all values are legel
      if (key !== 'error' && (!value || value === "-")) {
        this.setState({ ...this.state, error: "Please Enter All Correct Values" });
        event.preventDefault()
        return
      }
    }
    this.setState({ ...this.state, error: "" });
    this.props.onChange(this.props.field, this.state);
    event.preventDefault()
  }

  handleChange(event) {
    // check if the enter is number
    // enable the negative sign input
    if ("-" !== event.target.value && isNaN(event.target.value)) {
      this.setState({ ...this.state, error: "Please Enter Number" })
      return
    }

    // check the entered latitude and longtitude are valid
    const eventName = event.target.name;
    if (eventName.slice(eventName.length - 3, eventName.length) === "lat" && (event.target.value <= -90 || event.target.value >= 90)) {
      this.setState({ ...this.state, error: "Please Enter Correct latitude (-89.9999, 89.9999)" })
      return
    }
    if (eventName.slice(eventName.length - 3, eventName.length) === "lon" && (event.target.value <= -180 || event.target.value >= 180)) {
      this.setState({ ...this.state, error: "Please Enter Correct latitude (-179.9999, 179.9999)" })
      return
    }
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      error: ""
    })
  }

  toggleExpand() {
    this.props.onSetCollapse(this.props.field, !(this.props.collapse || false));
  }

  render() {
    const { label, bootstrapCss, collapse } = this.props;

    return (
      <li className={cx({ "list-group-item": bootstrapCss })}>
        <header onClick={this.toggleExpand.bind(this)}>
          <h5>
            {bootstrapCss ? (<span>
              <span className={cx("glyphicon", {
                "glyphicon-collapse-down": !collapse,
                "glyphicon-collapse-up": collapse
              })} />{" "}
            </span>) : null}
            {label}
          </h5>
        </header>
        <div style={{ display: collapse ? "none" : "block" }}>
          {this.state.error && <span style={{ color: "red" }}>{this.state.error}</span>}
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='min_lat'>Min Latitude:</label>
              <input
                name="min_lat"
                value={this.state.min_lat}
                onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor='min_lon'>Min Longtitude:</label>
              <input
                name="min_lon"
                value={this.state.min_lon}
                onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor='max_lat'>Max Latitude:</label>
              <input
                name="max_lat"
                value={this.state.max_lat}
                onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor='max_lon'>Max Longtitude:</label>
              <input
                name="max_lon"
                value={this.state.max_lon}
                onChange={this.handleChange}></input>

              <button className={cx({ "btn": bootstrapCss, "btn-default": bootstrapCss, "btn-sm": bootstrapCss })}>
                <span className={cx("glyphicon glyphicon-search")} />
              </button>
            </div>
          </form>
        </div>
      </li>
    );
  }
};

SpatialQuery.defaultProps = {
  field: null
};

SpatialQuery.propTypes = {
  bootstrapCss: PropTypes.bool,
  collapse: PropTypes.bool,
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSetCollapse: PropTypes.func
};

export default SpatialQuery;
