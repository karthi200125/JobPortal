import Title from '@/lib/MetaTitle'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full flex flex-col items-center justify-center h-screen text-center">
            <Title
                title="Page Not Found | JOBIFY"
                description="Oops! The page you are looking for does not exist. Return to JOBIFY and find your next job opportunity."
                keywords="404, page not found, error page, missing page, job portal"
            />
            <h2 >404 - Page Not Found</h2>
            <h5 className="mt-2 text-neutral-500">The page you are looking for might have been removed or is temporarily unavailable.</h5>
            <Link href="/jobs" className="mt-4 px-6 py-2 bg-[var(--voilet)] text-white rounded-lg hover:opacity-50 trans ">
                Go to Home
            </Link>
        </div>
    )
}