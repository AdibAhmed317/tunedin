import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import { signIn } from '@/auth';

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
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <Button
                className='w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-primary/10 hover:text-primary hover:cursor-pointer'
                type='submit'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='-3 0 262 262'
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='xMidYMid'
                  fill='#000000'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
                      fill='#4285F4'
                    ></path>
                    <path
                      d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
                      fill='#34A853'
                    ></path>
                    <path
                      d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
                      fill='#FBBC05'
                    ></path>
                    <path
                      d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
                      fill='#EB4335'
                    ></path>
                  </g>
                </svg>
                <span>Continue with Google</span>
              </Button>
            </form>
          </div>
        </div>

        <p className='text-sm text-muted-foreground mt-8'>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
