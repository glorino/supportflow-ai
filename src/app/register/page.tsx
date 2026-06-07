import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SF</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Account Creation</h1>
          <p className="mt-2 text-sm text-gray-500">
            New accounts are created by your organization administrator.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-6">
            🔒
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin-Only Account Creation</h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            To maintain data integrity and security, new team member accounts can only be created by your organization&apos;s administrator. Please contact your admin to get an invite.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">
              <strong>Already have an account?</strong><br />
              Sign in with your credentials provided by your administrator.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">
          Need help? Contact your system administrator.
        </p>
      </div>
    </div>
  );
}
