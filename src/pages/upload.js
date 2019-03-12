import React from 'react';
import {
  Upload,
  Icon,
  message,
  Input,
  Switch,
  Button,
  Modal,
  notification
} from 'antd';
import '../style/upload.sass';
import { connect } from 'react-redux';
import Slider from '../components/slider';
import QyAlert from '../components/alert';
import {
  upload,
  changeStep,
  openCompress,
  openScale,
  compressRequest,
  scaleRequest,
  uploadDirectlyRequest,
  uploadIndirectRequest,
  prefixInput
} from '../actions/upload';

const { Dragger } = Upload;
const uploadProps = {
  name: 'file',
  multiple: false,
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
    previewVisible: false
  };

  handlePreview = () => {
    this.setState({
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleCompress = () => {
    const { file, imageQuality } = this.props;
    this.props.compressRequest(file, imageQuality);
  };

  handleScale = () => {
    const { file, scaleRatio } = this.props;
    this.props.scaleRequest(file, scaleRatio);
  };

  handlePrefix = ({ target: { value } }) => {
    this.props.prefixInput(value);
  };

  handleUploadDirect = () => {
    const { file: image, prefix, compressSuccessStatus, fileName } = this.props;
    if (compressSuccessStatus) {
      this.props.uploadIndirectRequest(fileName, prefix);
    } else {
      this.props.uploadDirectlyRequest(image, prefix);
    }
  };

  beforeUpload = fileBefore => {
    const isLt2M = fileBefore.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于 2MB!');
    }
    this.props.upload(fileBefore);
    const { file } = this.props;
    if (file && isLt2M) {
      this.props.changeStep(1);
    }
    return isLt2M;
  };

  getObjectURL = file => {
    let url = null;
    if (window.createObjectURL !== undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  };

  backToUpload = () => {
    this.props.changeStep(0);
  };

  copyBoard = () => {
    const { imageLink } = this.props;
    navigator.clipboard.writeText(imageLink).then(() => {
      notification.open({
        message: '通知消息🍋',
        description: `粘贴成功`,
        duration: 6,
        icon: <Icon type="bulb" style={{ color: '#108ee9' }} />
      });
    });
  };

  render() {
    const { previewVisible } = this.state;
    const {
      step,
      compressStatus,
      scaleStatus,
      error,
      file,
      imageLink,
      compressionRatio
    } = this.props;
    return (
      <div
        className="upload-container"
        style={{ height: step === 0 ? `calc(100vh - 133px)` : `` }}
      >
        <QyAlert error={error} />
        {step === 0 ? (
          <Dragger
            accept=".png, .jpg, .jpeg"
            {...uploadProps}
            beforeUpload={this.beforeUpload}
            withCredentials
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          </Dragger>
        ) : (
          <div className="pic-quality-container">
            <div className="pic-function-container">
              <div className="pic-switch">
                <div className="pic-switch-item">
                  <div className="pic-switch-title">压缩图片</div>
                  <Switch
                    onChange={() => {
                      this.props.openCompress();
                    }}
                    defaultChecked={false}
                  />
                </div>
                <div className="pic-switch-item">
                  <div className="pic-switch-title">调整图片比例</div>
                  <Switch
                    onChange={() => {
                      this.props.openScale();
                    }}
                    defaultChecked={false}
                  />
                </div>
              </div>
              <div className="pic-container">
                <div className="pic-title">图片信息</div>
                <div>
                  <div style={{ marginBottom: `5px` }}>
                    图片名称：{file.name}
                  </div>
                  <div className="pic-instance" onClick={this.handlePreview}>
                    <img alt="example" src={this.getObjectURL(file)} />
                  </div>
                </div>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={this.getObjectURL(file)}
                  />
                </Modal>
              </div>
              {compressStatus ? (
                <div className="pic-wrapper">
                  <div className="pic-title">压缩图片</div>
                  <div className="pic-explain">
                    *eg. 对上传的图片进行压缩的比例（0-1）
                  </div>
                  <Slider silderType="compress" />
                  {compressionRatio ? (
                    <div style={{ marginBottom: `5px` }}>
                      真实压缩比：{compressionRatio}
                    </div>
                  ) : null}
                  <Button
                    type="primary"
                    icon="copy"
                    onClick={this.handleCompress}
                  >
                    压缩图片
                  </Button>
                </div>
              ) : null}

              {scaleStatus ? (
                <div className="pic-wrapper">
                  <div className="pic-title">调整图片比例</div>
                  <div className="pic-explain">
                    *eg. 对上传的图片进行调整的比例（0-1）
                  </div>
                  <Slider silderType="scale" />
                  <Button
                    type="primary"
                    icon="zoom-out"
                    onClick={this.handleScale}
                  >
                    调整比例
                  </Button>
                </div>
              ) : null}
              <div className="pic-title">图片前缀</div>
              <div className="pic-explain">
                *eg. 前缀为 under-graduate 图片链接就是
                https://static.airbob.org/under-graduate/图片名称
              </div>
              <div className="pic-path">
                <Input
                  style={{ width: `200px`, marginRight: `10px` }}
                  onChange={this.handlePrefix}
                  placeholder="需要上传的图片的路径"
                />
                {imageLink ? (
                  <Button onClick={this.copyBoard}>复制链接</Button>
                ) : null}
              </div>
              <Button
                onClick={this.backToUpload}
                style={{ marginRight: `20px` }}
                icon="arrow-left"
              >
                返回继续上传
              </Button>
              <Button
                onClick={this.handleUploadDirect}
                type="primary"
                icon="upload"
              >
                上传至七牛云
              </Button>
            </div>
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
  prefixInput: (...args) => dispatch(prefixInput(...args)),
  compressRequest: (...args) => dispatch(compressRequest(...args)),
  scaleRequest: (...args) => dispatch(scaleRequest(...args)),
  uploadDirectlyRequest: (...args) => dispatch(uploadDirectlyRequest(...args)),
  uploadIndirectRequest: (...args) => dispatch(uploadIndirectRequest(...args))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyUpload);
