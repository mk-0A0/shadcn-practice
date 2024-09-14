import {
  createPost,
  updatePost,
  getOwnPost,
} from '@/app/components/post-form/action'

export default async function PostForm({ editId }: { editId?: string }) {
  const oldPost = editId ? await getOwnPost(editId) : null
  const defaultValue = oldPost
    ? {
        title: oldPost.title,
        body: oldPost.body,
      }
    : {
        title: '',
        body: '',
      }

  return (
    <div>
      <form action={editId ? updatePost.bind(null, editId) : createPost}>
        <div>
          {oldPost?.thumbnailURL && (
            <div>
              <input
                type="checkbox"
                id="thumbnail-action"
                name="thumbnail-action"
                value="delete"
              />
              <label htmlFor="thumbnail-action">削除</label>
            </div>
          )}
          <input type="file" name="thumbnail" accept="images/png,images/jpeg" />
        </div>
        <label htmlFor="title">タイトル</label>
        <input
          maxLength={140}
          type="text"
          name="title"
          id="title"
          placeholder=""
          defaultValue={defaultValue.title}
          required
        />
        <label htmlFor="body">本文</label>
        <textarea
          maxLength={140}
          name="body"
          id="body"
          placeholder=""
          defaultValue={defaultValue.body}
          required
        />
        <button>{oldPost ? '更新' : '作成'}</button>
      </form>

      {editId && (
        <form action="">
          <button>記事を削除</button>
        </form>
      )}
    </div>
  )
}
