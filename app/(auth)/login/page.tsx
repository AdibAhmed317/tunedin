import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='w-full max-w-md space-y-8 text-center'>
        <div className='flex justify-center'>
          <div className='bg-primary/10 rounded-full p-4 inline-block'>
            <Music className='h-12 w-12 text-primary' />
          </div>
        </div>

        <PageHeader
          title='TunedIn'
          description='Your personal music library'
          className='text-center'
        />

        <div className='mt-10 bg-card rounded-lg p-6 shadow-lg border'>
          <h2 className='text-xl font-semibold mb-4'>Sign in to continue</h2>
          <p className='text-muted-foreground mb-8'>
            Access your playlists and favorites from any device
          </p>

          <div className='space-y-4'>
            <Button className='w-full flex items-center justify-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10' />
                <circle cx='12' cy='12' r='4' />
                <line x1='21.17' x2='12' y1='8' y2='8' />
                <line x1='3.95' x2='8.54' y1='6.06' y2='14' />
                <line x1='10.88' x2='15.46' y1='21.94' y2='14' />
              </svg>
              <span>Continue with Google</span>
            </Button>
            <Button variant='outline' className='w-full'>
              Continue as Guest
            </Button>
          </div>
        </div>

        <p className='text-sm text-muted-foreground mt-8'>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
