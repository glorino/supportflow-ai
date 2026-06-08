import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                SupportFlow<span className="text-gradient"> AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Enterprise-grade AI-powered customer support platform. Unify every channel with intelligent automation.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/features" className="text-sm text-gray-500 hover:text-gray-700 transition">Features</Link></li>
              <li><Link href="/agents" className="text-sm text-gray-500 hover:text-gray-700 transition">AI Agents</Link></li>
              <li><Link href="/channels" className="text-sm text-gray-500 hover:text-gray-700 transition">Channels</Link></li>
              <li><Link href="/workflow" className="text-sm text-gray-500 hover:text-gray-700 transition">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-gray-500">About</span></li>
              <li><span className="text-sm text-gray-500">Blog</span></li>
              <li><span className="text-sm text-gray-500">Careers</span></li>
              <li><span className="text-sm text-gray-500">Contact</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-gray-500">Privacy</span></li>
              <li><span className="text-sm text-gray-500">Terms</span></li>
              <li><span className="text-sm text-gray-500">Security</span></li>
              <li><span className="text-sm text-gray-500">GDPR</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SupportFlow AI. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> SOC 2 Compliant</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> GDPR Ready</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> 99.99% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
