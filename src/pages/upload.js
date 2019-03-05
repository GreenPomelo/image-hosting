import React from 'react';
import { Upload, Icon, message, Input, Switch, Modal, Button } from 'antd';
import '../style/upload.sass';
import { connect } from 'react-redux';
import Slider from '../components/slider';
import {
  upload,
  changeStep,
  openCompress,
  openScale,
  compressRequest,
  scaleRequest,
  uploadDirectlyRequest,
  uploadIndirectRequest
} from '../actions/upload';

const { Dragger } = Upload;
const uploadProps = {
  name: 'file',
  multiple: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  // Requset Url
  onChange(info) {
    const {
      file: { status }
    } = info;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class QyUpload extends React.Component {
  state = {
    previewImage: ''
  };

  handleUpload = ev => {
    this.props.upload(ev.file);
    const { file } = this.props;
    console.log(file);
    if (file) {
      this.props.changeStep(1);
    }
  };

  render() {
    const { file, step, compressStatus, scaleStatus } = this.props;
    const { previewImage } = this.state;
    return (
      <div className="upload-container">
        {step === 0 ? (
          <Dragger
            accept=".png, .jpg, .jpeg"
            {...uploadProps}
            onChange={this.handleUpload}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        ) : (
          <div className="pic-quality-container">
            <div className="pic-switch">
              <div className="pic-switch-item">
                <div className="pic-switch-title">压缩质量</div>
                <Switch
                  onChange={() => {
                    this.props.openCompress();
                  }}
                  defaultChecked
                />
              </div>
              <div className="pic-switch-item">
                <div className="pic-switch-title">调整比例</div>
                <Switch
                  onChange={() => {
                    this.props.openScale();
                  }}
                  defaultChecked
                />
              </div>
            </div>
            {compressStatus ? (
              <div className="pic-wrapper">
                <div className="pic-title">压缩图片</div>
                <div className="pic-explain">
                  *eg. 对上传的图片进行压缩的比例（0-1）
                </div>
                <Slider />
                <Button type="primary" icon="copy" onChange={() => {}}>
                  压缩图片
                </Button>
              </div>
            ) : null}

            {scaleStatus ? (
              <div className="pic-wrapper">
                <div className="pic-title">调整比例</div>
                <div className="pic-explain">
                  *eg. 对上传的图片进行调整的比例（0-1）
                </div>
                <Slider />
                <Button type="primary" icon="zoom-out">
                  调整比例
                </Button>
              </div>
            ) : null}
            <div className="pic-title">图片前缀</div>
            <div className="pic-explain">
              *eg. 前缀为 under-graduate/ 图片链接就是
              https://static.airbob.org/under-graduate/图片名称
            </div>
            <div className="pic-path">
              <Input placeholder="需要上传的图片的路径" />
            </div>
            <Button type="primary" icon="upload">
              上传至七牛云
            </Button>
            <Modal
              // visible={previewVisible}
              footer={null}
              // onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.uploadReducer });

const mapDispatchToProps = dispatch => ({
  upload: (...args) => dispatch(upload(...args)),
  changeStep: (...args) => dispatch(changeStep(...args)),
  openCompress: () => dispatch(openCompress()),
  openScale: () => dispatch(openScale()),
  compressRequest: (...args) => dispatch(compressRequest(...args)),
  scaleRequest: (...args) => dispatch(scaleRequest(...args)),
  uploadDirectlyRequest: (...args) => dispatch(uploadDirectlyRequest(...args)),
  uploadIndirectRequest: (...args) => dispatch(uploadIndirectRequest(...args))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyUpload);
