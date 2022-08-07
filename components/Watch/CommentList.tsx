import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'lib';
import { Video } from 'lib/getVideo';

import style from './CommentList.module.css';

interface VideoProps {
  video: Video;
}

const CommentList = ({ video }: VideoProps) => {
  const [comments, setComments] = useState(video?.comments);
  const [comment, setComment] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  const addCommentHandler = async () => {
    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        text: comment,
        videoId: video?.id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((comments) => [data, ...comments]);
        setComment('');
      });
  };

  return (
    <div className={style.commentList}>
      <p>{comments?.length} Comments</p>

      <div className={style.commentList_input}>
        <input
          className={style.commentList_input_text}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onClick={() => {
            !user && router.push('/login');
          }}
        />

        <div className={style.commentList_input_btns}>
          <p
            className={style.commentList_input_btnClear}
            onClick={() => {
              setComment('');
            }}
          >
            Clear
          </p>
          <button
            className={style.commentList_input_btnComment}
            onClick={addCommentHandler}
          >
            Comment
          </button>
        </div>
      </div>

      <div className={style.commentList_comments}>
        {comments?.map((comment) => (
          <div className={style.commentList_comment} key={comment?.id}>
            <div className={style.commentList_comment_avatar}>
              <h4>K</h4>
            </div>

            <div>
              <h4 className={style.commentList_comment_name}>
                {comment.user?.firstName + ' ' + comment.user?.lastName}
              </h4>
              <p>{comment?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
