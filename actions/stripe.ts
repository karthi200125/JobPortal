'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
    typescript: true
});

export const CheckOutSession = async (values: any) => {
    const { user } = values;

    const shippingInfo = `${user?.address}, ${user?.city}, ${user?.state}, India`;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?order_success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/success?order_success=false`,
            customer_email: user?.email,
            client_reference_id: user?.id,
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            metadata: {
                shippingInfo,
                quantities: 1,
            },
        });

        return { sessionUrl: session.url };

    } catch (error) {
        throw error;
    }
};