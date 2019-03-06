import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { scaleSlider, compressSlider } from '../actions/upload';

class DecimalStep extends React.Component {
  state = {
    inputValue: 0
  };

  onChange = value => {
    if (Number.isNaN(value)) {
      return;
    }
    const { silderType } = this.props;
    if (silderType === 'compress') {
      this.props.compressSlider(value);
    } else {
      this.props.scaleSlider(value);
    }
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ marginLeft: 16 }}
            step={0.01}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({ ...state.uploadReducer });

const mapDispatchToProps = dispatch => ({
  scaleSlider: (...args) => dispatch(scaleSlider(...args)),
  compressSlider: (...args) => dispatch(compressSlider(...args))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecimalStep);
