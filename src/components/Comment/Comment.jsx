import { Comment } from "@ant-design/compatible";
import { Avatar, Button, Col, Divider, Form, Input, List, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants/common";

const { TextArea } = Input;

const CommentItem = ({ author, avatar, content, datetime,id,handleChangeComment,handleDeleteCComment }) => {
  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.user));
  const fullname = (user) =>  currentUser?.firstName + " "  + currentUser?.lastName

  const [modeEdit, setModeEdit] = useState(false);
  const [txt, setTxt] = useState(content);
  const deleteComment = () => {
    handleDeleteCComment(id);
  };
  const editComment = () => {
    handleChangeComment({
      author,
      avatar,
      content:txt,
      datetime:moment().fromNow(),
      id
    })
    setModeEdit(false)
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 20,
        background: "white",
      }}
    >
      <Avatar>{author?.name &&author?.name[0]?.toUpperCase()}</Avatar>
      <div>
        <div>
          <span
            style={{
              color: "rgb(41, 174, 189)",
              marginRight: 10,
              fontWeight: "bold",
            }}
          >
            {author?.name}
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
        {modeEdit ? (
          <div>
            <Input.TextArea
              style={{
                minWidth: 400,
              }}
              value={txt}
              rows={3}
              onChange={(e) => setTxt(e.target.value)}
            />
                      <div style={{marginTop:10}}>
                        <Button
                        onClick={() => editComment()}
                          style={{
                          marginRight:10,
                          background:"rgb(41, 174, 189)",
                          color:"white"
                        }}>Ok</Button>
                        <Button onClick = {() => {
                          setModeEdit(false);
                          setTxt(content)
                        }}>Hủy</Button>
                      </div>

          </div>
        ) : (
          <p>{content}</p>
        )}
        {author?.id === currentUser?.id && !modeEdit&&(
          <div
            style={{
              fontSize: 12,
              display: "flex",
              gap: 10,
            }}
          >
            <span onClick={() => deleteComment()} className="point">
              Xóa
            </span>
            <span onClick={() => setModeEdit(true)} className="point">
              Sửa
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
const CommentList = ({ comments,handleChangeComment,handleDeleteCComment }) => (
  <div
    style={{
      background: "white",
    }}
  >
    {!comments.length ? (
      <div>
        <div>0 bình luận</div>
        <Divider />
      </div>
    ) : (
      <List
        dataSource={comments}
        header={`${comments.length} ${"bình luận"}`}
        itemLayout="horizontal"
        renderItem={(props) => <CommentItem handleChangeComment={handleChangeComment} handleDeleteCComment={handleDeleteCComment}  {...props} />}
      />
    )}
  </div>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
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
        author: {
          name: currentUser?.firstName + " "  + currentUser?.lastName,
          id: currentUser?.id,
        },
        avatar: "",
        content: value,
        datetime: moment().fromNow(),
        id:Math.random()*199999
      },
    ]);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };


  const handleDeleteCComment = (id) => {
    setComments(comments.filter(i => i.id!==id))
  }
  const handleChangeComment = (newcomment) => {
    const newList = [...comments];
    const {id} = newcomment;
    const index = newList.findIndex(i => i.id === id);
    if(index >=0){
      newList[index] = newcomment;
      setComments(newList)
    }
  }
  return (
    <div>
      <CommentList handleDeleteCComment={handleDeleteCComment} handleChangeComment={handleChangeComment} comments={comments} />
      {currentUser && <Comment
        avatar={<Avatar>{currentUser?.firstName[0].toUpperCase()}</Avatar>}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />}
    </div>
  );
};

export default CommentCpn;
