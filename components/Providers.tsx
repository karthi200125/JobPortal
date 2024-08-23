'use client'

import Store from "@/app/Redux/Store";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { Provider } from "react-redux";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {

    const queryClient = new QueryClient()

    return (
        <div>
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        </div>
    )
}

export default Providers