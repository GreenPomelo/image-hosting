import React from "react";
import { Upload, Icon, message } from "antd";
import "../style/upload.css";
const Dragger = Upload.Dragger;

const props = {
  name: "file",
  multiple: false,
  action: "//jsonplaceholder.typicode.com/posts/",
  // Requset Url
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

export default class QyUpload extends React.Component {
  render() {
    return (
      <div className="upload-container">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          {/* <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p> */}
        </Dragger>
      </div>
    );
  }
}
