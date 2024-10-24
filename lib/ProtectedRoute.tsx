'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        const currentPath = window.location.pathname;        
        if (!user) {
            router.push('/');
        } else {            
            const restrictedPaths = ['/signin', '/signUp', '/'];
            if (restrictedPaths.includes(currentPath)) {
                router.push(`/userProfile/${user.id}`);
            }
        }
    }, [user, router]);

    return null;
};

export default ProtectedRoute;
