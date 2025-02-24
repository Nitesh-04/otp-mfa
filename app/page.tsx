export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Secure Login</h1>
        <p className="text-gray-600 mb-6">Two-Factor Authentication (MFA) for better security</p>
        <a href="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition">
            Login
          </button>
        </a>
      </div>
    </div>
  );
}
