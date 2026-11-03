export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        action="/admin/login/submit"
        method="post"
        className="w-full max-w-sm rounded-md border border-zinc-300 bg-white p-6 shadow-sm"
      >
        <h1 className="mb-4 text-lg font-semibold">管理画面ログイン</h1>

        {error === "invalid" && (
          <p className="mb-3 text-sm text-red-600">パスワードが正しくありません。</p>
        )}
        {error === "locked" && (
          <p className="mb-3 text-sm text-red-600">
            試行回数が多すぎます。しばらく時間をおいて再度お試しください。
          </p>
        )}

        <label htmlFor="password" className="mb-1 block text-sm text-zinc-700">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="mb-4 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="w-full rounded bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          ログイン
        </button>
      </form>
    </main>
  );
}
