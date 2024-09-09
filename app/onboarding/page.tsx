import { createUser, currentUser } from '@/app/onboarding/action'

async function UserForm({ editMode }: { editMode?: boolean }) {
  const user = await currentUser()
  const defaultValue = editMode
    ? {
        name: user?.name,
        profileImage: user?.profileImageURL,
      }
    : { name: 'Demo User', profileImage: '' }

  return (
    <form action={createUser}>
      <div className="space-y-6">
        <h1 className="font-bold text-xl mb-4">
          プロフィールを{editMode ? '更新' : '作成'}する
        </h1>
        <div className="space-y-1.5">
          <label>プロフィール画像</label>
          <div className="w-40 h-40 bg-gray-200"></div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            required
            defaultValue={defaultValue.name}
            name="name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          {editMode ? '更新' : 'プロフィールを作成する'}
        </button>
      </div>
    </form>
  )
}

export default async function Page() {
  return <UserForm />
}
