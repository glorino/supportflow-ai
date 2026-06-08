"use client";

const settingsSections = [
  {
    title: "Organization",
    icon: "🏢",
    items: [
      { label: "Organization Profile", desc: "Company name, logo, and branding", current: "Acme Corp" },
      { label: "Billing & Subscription", desc: "Plan details and payment method", current: "Growth Plan" },
      { label: "Working Hours", desc: "Business hours and holidays", current: "Mon-Fri, 9AM-6PM EST" },
      { label: "Timezone", desc: "Default timezone for the organization", current: "America/New_York" },
    ],
  },
  {
    title: "AI Configuration",
    icon: "🤖",
    items: [
      { label: "AI Agent Settings", desc: "Configure AI behavior and response style", current: "Active" },
      { label: "Auto-Resolution Rules", desc: "When AI should auto-resolve tickets", current: "70% confidence" },
      { label: "Escalation Triggers", desc: "Conditions that trigger human escalation", current: "5 rules active" },
      { label: "Knowledge Base AI", desc: "AI search and article suggestions", current: "Enabled" },
    ],
  },
  {
    title: "Channels",
    icon: "📡",
    items: [
      { label: "Web Chat Widget", desc: "Embed and customize the chat widget", current: "Connected" },
      { label: "WhatsApp Business", desc: "WhatsApp Business API integration", current: "Connected" },
      { label: "Email Integration", desc: "IMAP/SMTP email configuration", current: "Connected" },
      { label: "SMS (Twilio)", desc: "SMS messaging configuration", current: "Connected" },
      { label: "Facebook Messenger", desc: "Messenger integration", current: "Connected" },
      { label: "Instagram DM", desc: "Instagram Direct Messages", current: "Connected" },
    ],
  },
  {
    title: "Security",
    icon: "🔒",
    items: [
      { label: "Authentication", desc: "SSO, 2FA, and login settings", current: "2FA Enabled" },
      { label: "Roles & Permissions", desc: "RBAC configuration", current: "5 roles" },
      { label: "API Keys", desc: "Manage API keys and tokens", current: "3 active keys" },
      { label: "Audit Log", desc: "Activity tracking and compliance", current: "Enabled" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your organization, AI, and integrations</p>
        </div>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, i) => {
          const colors = ["card-gradient-blue", "card-gradient-green", "card-gradient-purple", "card-gradient-amber"];
          const gradients = ["from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-purple-500 to-violet-600", "from-amber-400 to-orange-500"];
          return (
          <div key={section.title} className="rounded-2xl border border-gray-200 overflow-hidden card-glow">
            <div className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${gradients[i % gradients.length]} text-white`}>
              <span className="text-lg">{section.icon}</span>
              <h3 className="text-base font-semibold">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{item.current}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
