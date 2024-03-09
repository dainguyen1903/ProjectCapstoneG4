import React, { useState } from 'react';
import { Comment, Tooltip, List, Input, Button, Rate } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentCpn = () => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleRateChange = value => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!value || !rating) {
      return;
    }
    const newComment = {
      author: 'Anonymous',
      content: value,
      datetime: moment().fromNow(),
      rating: rating
    };
    setComments([...comments, newComment]);
    setValue('');
    setRating(0);
  };

  return (
    <div>
      <List
        className="comment-list"
        header={`${comments.length} comments`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <li>
            <Comment
              author={item.author}
              content={item.content}
              datetime={item.datetime}
              actions={[<Rate disabled value={item.rating} />]}
            />
          </li>
        )}
      />
      <TextArea rows={4} value={value} onChange={handleChange} />
      <Rate value={rating} onChange={handleRateChange} />
      <Button onClick={handleSubmit} type="primary">
        Add Comment
      </Button>
    </div>
  );
};

export default CommentCpn