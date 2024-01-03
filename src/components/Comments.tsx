import { useContext, useState } from 'react'
import { PostProps } from './PostList'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import AuthContext from 'context/AuthContext'
import { toast } from 'react-toastify'

const COMMENTS = [
  {
    id: 1,
    email: 'test@test.com',
    content: '컨텐트1',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    email: 'test2@test.com',
    content: '컨텐트2',
    createdAt: '2024-01-01',
  },
  {
    id: 3,
    email: 'test3@test.com',
    content: '컨텐트3',
    createdAt: '2024-01-01',
  },
]

interface CommentsProps {
  post: PostProps
}

export default function Comments({ post }: CommentsProps) {
  const [comment, setComment] = useState('')
  const { user } = useContext(AuthContext)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'comment') {
      setComment(value)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id)

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          })
        }
      }

      toast.success('댓글을 생성했습니다.')
      setComment('')
    } catch (e: any) {
      console.log(e)
      toast.error(e?.code)
    }
  }

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            required
            onChange={onChange}
          />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment?.email}</div>
              <div className="comment__date">{comment?.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}