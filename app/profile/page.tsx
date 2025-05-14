import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Sun, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  return (
    <div className='container px-4 pt-6 pb-20'>
      <PageHeader title='Profile' />

      <div className='flex items-center space-x-4 mb-8'>
        <Avatar className='h-20 w-20'>
          <AvatarImage
            src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='User'
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='text-xl font-bold'>Jane Doe</h2>
          <p className='text-muted-foreground'>jane.doe@example.com</p>
        </div>
      </div>

      <Tabs defaultValue='settings'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
        </TabsList>

        <TabsContent value='settings' className='space-y-6 pt-4'>
          <div className='space-y-4'>
            <h3 className='font-medium leading-none'>Playback</h3>
            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label htmlFor='autoplay-toggle'>Autoplay</Label>
                <p className='text-muted-foreground text-sm'>
                  Automatically play next track
                </p>
              </div>
              <Switch id='autoplay-toggle' defaultChecked />
            </div>

            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label htmlFor='quality-toggle'>High Quality Audio</Label>
                <p className='text-muted-foreground text-sm'>
                  Use more data for better sound
                </p>
              </div>
              <Switch id='quality-toggle' />
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium leading-none'>Notifications</h3>
            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label htmlFor='notification-toggle'>Push Notifications</Label>
                <p className='text-muted-foreground text-sm'>
                  Receive updates about new content
                </p>
              </div>
              <Switch id='notification-toggle' />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='account' className='space-y-6 pt-4'>
          <div className='space-y-4'>
            <Button variant='outline' className='w-full justify-start'>
              <Settings className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>

            <Button variant='outline' className='w-full justify-start'>
              <HelpCircle className='mr-2 h-4 w-4' />
              Help & Support
            </Button>

            <Button
              variant='outline'
              className='w-full justify-start text-destructive'
            >
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </Button>
          </div>

          <div className='pt-4'>
            <p className='text-muted-foreground text-xs text-center'>
              YTunes v1.0.0 • © 2025 YTunes
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
