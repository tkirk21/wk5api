//app/types/user.tsx
export interface User {
    id: number; 
    name: string;
    lineStatus: 'online' | 'offline';
  }