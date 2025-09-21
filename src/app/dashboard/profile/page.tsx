'use client';

import { useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/use-user';

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user && newImageUrl) {
      updateUser({ ...user, profileImageUrl: newImageUrl });
      setNewImageUrl(null);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32 rounded-full">
              <Image
                src={newImageUrl || user.profileImageUrl || 'https://picsum.photos/seed/user/200/200'}
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
                data-ai-hint="profile picture"
              />
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="picture">Update Profile Picture</Label>
            <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button onClick={handleSave} disabled={!newImageUrl}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
