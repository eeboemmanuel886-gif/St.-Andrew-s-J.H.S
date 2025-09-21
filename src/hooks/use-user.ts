'use client';

import { useState, useEffect } from 'react';

export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  class: 'BASIC 7' | 'BASIC 8' | 'BASIC 9' | null;
  profileImageUrl?: string;
}

const USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    role: 'teacher',
    class: null,
    profileImageUrl: 'https://picsum.photos/seed/teacher1/200/200',
  },
  {
    id: '2',
    name: 'Alex Johnson',
    role: 'student',
    class: 'BASIC 8',
    profileImageUrl: 'https://picsum.photos/seed/student1/200/200',
  },
  {
    id: '3',
    name: 'Samuel Green',
    role: 'parent',
    class: null,
    profileImageUrl: 'https://picsum.photos/seed/parent1/200/200',
  },
  {
    id: '4',
    name: 'Principal Thompson',
    role: 'admin',
    class: null,
    profileImageUrl: 'https://picsum.photos/seed/admin1/200/200',
  },
  {
    id: '5',
    name: 'Bella Smith',
    role: 'student',
    class: 'BASIC 7',
    profileImageUrl: 'https://picsum.photos/seed/student2/200/200',
  },
  {
    id: '6',
    name: 'Chris Lee',
    role: 'student',
    class: 'BASIC 9',
    profileImageUrl: 'https://picsum.photos/seed/student3/200/200',
  },
];

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    const userToLogin = USERS.find((u) => u.role === role);
    if (userToLogin) {
      localStorage.setItem('currentUser', JSON.stringify(userToLogin));
      setUser(userToLogin);
      return userToLogin;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };
  
  const updateUser = (updatedUser: User) => {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return { user, USERS, login, logout, updateUser };
}
