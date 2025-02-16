'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
    typescript: true
});

export const CheckOutSession = async (values: any) => {
    // const { user, products } = values;

    // const shippingInfo = `${user?.address}, ${user?.city}, ${user?.state}, India`;

    // const lineItems = products?.map((pro: any) => ({
    //     price_data: {
    //         currency: 'inr',
    //         product_data: {
    //             name: pro?.proName,
    //             images: [pro?.proImage[0]],
    //             metadata: {
    //                 productId: pro?.id,
    //                 proSelectedColor: pro?.proSelectedColor,
    //                 proSelectedSize: pro?.proSelectedSize,
    //             },
    //         },
    //         unit_amount: parseFloat(pro?.proPrice) * 100,
    //     },
    //     quantity: pro?.proQuantity,
    // }));

    // try {
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ['card'],
    //         success_url: `${process.env.NEXT_PUBLIC_URL}/success?order_success=true`,
    //         cancel_url: `${process.env.NEXT_PUBLIC_URL}/success?order_success=false`,
    //         customer_email: user?.email,
    //         client_reference_id: user?.id,
    //         mode: 'payment',
    //         billing_address_collection: 'required',
    //         shipping_address_collection: {
    //             allowed_countries: ['IN'],
    //         },
    //         metadata: {
    //             shippingInfo,
    //             productIds: products.map((pro: any) => pro?.id).join(','),
    //             quantities: products.map((pro: any) => pro?.proQuantity).join(','),
    //         },
    //         line_items: lineItems,
    //     });

    //     return { sessionUrl: session.url };

    // } catch (error) {
    //     throw error;
    // }
};