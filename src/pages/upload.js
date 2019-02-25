import React from 'react';
import { Upload, Icon, message } from 'antd';
import '../style/upload.css';
import Slider from '../components/slider';

// const Dragger = Upload.Dragger;
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  // Requset Url
  onChange(info) {
    const {
      file: { status }
    } = info;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

export default class QyUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1
    };
  }

  render() {
    const { step } = this.state;
    return (
      <div className="upload-container">
        {step === 1 ? (
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        ) : (
          <div className="step-second-container">
            <div className="divide-line">压缩质量</div>
            <Slider />
          </div>
        )}
      </div>
    );
  }
}
