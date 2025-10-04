'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Ticket, ChartBar as BarChart3, BookOpen, Settings, Building2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Ticket, label: 'Tickets', href: '/tickets' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: BookOpen, label: 'Knowledge Base', href: '/knowledge-base' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-40',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#004b87] text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">AI-CENTRAL</h1>
                <p className="text-xs text-slate-500">POWERGRID</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#004b87] text-white mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                  isActive
                    ? 'bg-[#004b87] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                  collapsed && 'justify-center'
                )}
              >
                <Icon className={cn('flex-shrink-0', collapsed ? 'w-5 h-5' : 'w-5 h-5')} />
                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapse(!collapsed)}
            className={cn('w-full', collapsed && 'justify-center')}
          >
            <ChevronLeft
              className={cn(
                'w-4 h-4 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
