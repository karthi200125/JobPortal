'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
    typescript: true
});

export const CheckOutSession = async (values: any) => {
    const { user, plan } = values;
    
    if (!user || !plan) {
        console.log("User or subscription plan missing.");
        return;
    }

    try {
        let customer: any = await stripe.customers.list({ email: user.email, limit: 1 });
        if (!customer.data.length) {
            customer = await stripe.customers.create({
                email: user.email,
                name: user.username,
            });
        } else {
            customer = customer.data[0];
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            success_url: `http://localhost:3000/success?order_success=true`,
            cancel_url: `http://localhost:3000/success?order_success=false`,
            customer: customer.id,
            metadata: {
                userId: user.id,
                role: user.role,
                plan: plan.name,
                subscriptionType: plan.type,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: plan.name,
                            description: plan.features.join(', '),
                        },
                        unit_amount: Number(plan.price.replace(',', '')) * 100, 
                        recurring: {
                            interval: plan.type === 'Monthly' ? 'month' : 'year',
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        return { sessionUrl: session.url };

    } catch (error) {
        throw error;
    }
};

