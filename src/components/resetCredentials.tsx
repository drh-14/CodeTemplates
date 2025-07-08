'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetCredentials() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeCredentials = async () => {
    const response = await fetch('http://localhost:8000/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 200) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 gap-8">
      <Input onChange={(e) => setUsername(e.target.value)} className="w-1/4" placeholder="New username" />
      <Input onChange={(e) => setPassword(e.target.value)} className="w-1/4" placeholder="New password" />
      <Button onClick={changeCredentials}>Change Credentials</Button>
    </div>
  );
}