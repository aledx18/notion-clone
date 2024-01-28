import TitleSection from '@/components/landing-page/title-section'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <>
      <section className='overflow-hidden px-4 sm:px-6 pt-10 sm:flex sm:flex-col md:justify-center gap-4 md:items-center'>
        <TitleSection
          pill='✨ Your Workspace, Perfected'
          title='All-In-One Collaboration and Productivity Platform'
        />
        <div className='bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-secondary-foreground sm:w-[300px]'>
          <Button
            variant='ghost'
            className=' w-full rounded-[10px] p-6 text-2xl bg-background'>
            Get Cypress Free
          </Button>
        </div>
      </section>
    </>
  )
}
