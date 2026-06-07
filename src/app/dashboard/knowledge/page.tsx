const articles = [
  { id: 1, title: "How to Reset Your Password", collection: "Account Help", status: "published", views: 1240, helpful: 89, aiUsed: 342 },
  { id: 2, title: "Billing Cycle Explained", collection: "Billing", status: "published", views: 890, helpful: 76, aiUsed: 210 },
  { id: 3, title: "API Integration Guide", collection: "Technical", status: "published", views: 567, helpful: 92, aiUsed: 156 },
  { id: 4, title: "Refund Policy & Process", collection: "Billing", status: "published", views: 1100, helpful: 81, aiUsed: 445 },
  { id: 5, title: "Two-Factor Authentication Setup", collection: "Account Help", status: "published", views: 780, helpful: 94, aiUsed: 198 },
  { id: 6, title: "Webhook Configuration", collection: "Technical", status: "draft", views: 0, helpful: 0, aiUsed: 0 },
  { id: 7, title: "Shipping & Delivery FAQ", collection: "General", status: "published", views: 2100, helpful: 88, aiUsed: 567 },
  { id: 8, title: "Data Export & GDPR", collection: "Legal", status: "published", views: 340, helpful: 91, aiUsed: 89 },
];

const collections = [
  { name: "Account Help", count: 12, icon: "🔑" },
  { name: "Billing", count: 8, icon: "💳" },
  { name: "Technical", count: 15, icon: "🔧" },
  { name: "General", count: 6, icon: "📋" },
  { name: "Legal", count: 4, icon: "⚖️" },
];

const statusColor: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
};

export default function KnowledgePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
          + New Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Collections Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Collections</h3>
            <div className="space-y-2">
              {collections.map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{c.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{c.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collection</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Helpful</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.collection}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.helpful}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.aiUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
