'use client';

import {
  Bell,
  Book,
  Home,
  LogOut,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, type User } from '@/hooks/use-user';
import { SidebarMenuButton } from './sidebar-menu-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const teacherLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/subjects', label: 'Subjects', icon: Book },
  { href: '/dashboard/students', label: 'Students', icon: Users },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: Bell,
  },
];

const studentLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/subjects', label: 'Subjects', icon: Book },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: Bell,
  },
];

const parentLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: Bell,
  },
];

const adminLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/subjects', label: 'Subjects', icon: Book },
  { href: '/dashboard/students', label: 'Students', icon: Users },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: Bell,
  },
];

const navLinks = {
  teacher: teacherLinks,
  student: studentLinks,
  parent: parentLinks,
  admin: adminLinks,
};

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const links = user ? navLinks[user.role] : [];
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-800">
      <div className="border-b p-4 dark:border-gray-700">
        <h1 className="text-xl font-bold">St. Andrew's J.H.S</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => (
          <SidebarMenuButton
            key={link.label}
            href={link.href}
            label={link.label}
            icon={link.icon}
            isActive={pathname === link.href}
          />
        ))}
      </nav>
      <div className="border-t p-4 dark:border-gray-700">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center space-x-2 rounded-md p-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profileImageUrl} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.class}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
