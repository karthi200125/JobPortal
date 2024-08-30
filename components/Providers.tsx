'use client'

import Store from "@/app/Redux/Store";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { Provider } from "react-redux";
import { Toaster } from "sonner"

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {

    const queryClient = new QueryClient()

    return (
        <div>
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    {/* <Toaster position="bottom-right" style={{ zIndex: '9999' }} /> */}
                    {children}
                </QueryClientProvider>
            </Provider>
        </div>
    )
}

export default Providers