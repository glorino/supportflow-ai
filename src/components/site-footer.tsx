import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gradient-to-b from-gray-50/80 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-md shadow-blue-600/15">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <span className="font-bold text-gray-900 text-lg tracking-tight">
                SupportFlow<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ml-0.5"> AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Enterprise-grade AI-powered customer support platform. Unify every channel with intelligent automation.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/features" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="/agents" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">AI Agents</Link></li>
              <li><Link href="/channels" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Channels</Link></li>
              <li><Link href="/workflow" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">How It Works</Link></li>
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
        <div className="border-t border-gray-200/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SupportFlow AI. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" /> SOC 2 Compliant</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" /> GDPR Ready</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" /> 99.99% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
