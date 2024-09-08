export default async function Page() {
  return (
    <form action="">
      <label htmlFor="name">名前</label>
      <input type="text" id="name" required defaultValue="" name="name" />
      <button>作成</button>
    </form>
  )
}
