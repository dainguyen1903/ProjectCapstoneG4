import { Comment } from "@ant-design/compatible";
import { Avatar, Button, Col, Divider, Form, Input, List, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/authSlice";
import { LOCAL_STORAGE_KEY } from "../../constants/common";
import { auth } from "../../pages/firebase/config";

const { TextArea } = Input;

const CommentItem = ({ author, avatar, content, datetime }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 20,
        background:"white"
      }}
    >
      <Avatar>{author[0].toUpperCase()}</Avatar>
      <div>
        <div>
          <span
            style={{
              color: "rgb(41, 174, 189)",
              marginRight: 10,
              fontWeight:"bold"
            }}
          >
            {author}
          </span>
          <span
            style={{
              color: "gray",
              marginRight: 15,
            }}
          >
            {datetime}
          </span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};
const CommentList = ({ comments }) => (
  <div style={{
    background:"white"
  }}>
    {!comments.length?<div>
     <div>
     0 bình luận
     </div>
    <Divider />
    </div>:   <List
    dataSource={comments}
    header={`${comments.length} ${"bình luận"}`}
    itemLayout="horizontal"
    renderItem={(props) => <CommentItem {...props} />}
  />}
 
  </div>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div >
    <Form.Item>
      <Row>
        <Col span={12}>
          <TextArea rows={4} onChange={onChange} value={value} />
        </Col>
      </Row>
    </Form.Item>
    <Form.Item>
      <Button
        style={{
          background: "rgb(41, 174, 189)",
        }}
        htmlType="submit"
        onClick={onSubmit}
        type="primary"
      >
        Thêm bình luận
      </Button>
    </Form.Item>
  </div>
);

const CommentCpn = ({ comments, setComments }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.user));
  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setValue("");
    setComments([
      ...comments,
      {
        author: currentUser.fullname,
        avatar: "",
        content: value,
        datetime: moment().fromNow(),
      },
    ]);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
       <CommentList comments={comments} />
      <Comment
        avatar={<Avatar>{currentUser.fullname[0].toUpperCase()}</Avatar>}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};

export default CommentCpn;
