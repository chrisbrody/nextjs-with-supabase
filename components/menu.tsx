import Link from "next/link";

export default function menu() {
    return (
        <>
            <Link href="/dashboard/activities" className="text-blue-500 hover:underline">
                Activities
            </Link>
            <Link href="/dashboard/master/designers" className="text-blue-500 hover:underline">
                Designers
            </Link>
            <Link href="/dashboard/master/activitytypes" className="text-blue-500 hover:underline">
                Activity Types
            </Link>
        </>
    )
}