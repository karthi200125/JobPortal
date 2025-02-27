'use server';

import { db } from '@/lib/db';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
        return new Response('Missing Stripe signature', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("⚠️ Webhook Signature Verification Failed:", err);
        return new Response(
            `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
            { status: 400 }
        );
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (!session?.metadata?.userId) {
        return new Response(null, { status: 200 });
    }

    const userId = Number(session.metadata.userId);

    try {
        if (event.type === 'checkout.session.completed') {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            console.log('✅ Subscription created:', subscription.id);

            await db.$transaction([
                db.user.update({
                    where: { id: userId },
                    data: {
                        isPro: true,
                        updatedAt: new Date(),
                    },
                }),
                db.subscription.upsert({
                    where: { userId },
                    update: {
                        stripeSubscriptionId: subscription.id,
                        stripeCustomerId: subscription.customer as string,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        subscriptionStatus: subscription.status,
                        planName: session.metadata.planName,
                        billingInterval: session.metadata.subscriptionType,
                        amount: subscription.items.data[0].price.unit_amount! / 100,
                    },
                    create: {
                        userId,
                        stripeSubscriptionId: subscription.id,
                        stripeCustomerId: subscription.customer as string,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        subscriptionStatus: subscription.status,
                        planName: session.metadata.planName,
                        billingInterval: session.metadata.subscriptionType,
                        amount: subscription.items.data[0].price.unit_amount! / 100,
                    },
                }),
            ]);
        }

        if (event.type === 'invoice.payment_succeeded') {
            console.log('💳 Invoice payment succeeded for user:', userId);

            await db.user.update({
                where: { id: userId },
                data: {
                    isPro: true,
                    updatedAt: new Date(),
                },
            });
        }

        if (
            event.type === 'customer.subscription.deleted' ||
            event.type === 'invoice.payment_failed'
        ) {
            console.log('❌ Subscription expired/cancelled for user:', userId);

            await db.$transaction([
                db.user.update({
                    where: { id: userId },
                    data: {
                        isPro: false,
                        updatedAt: new Date(),
                    },
                }),
                db.subscription.deleteMany({
                    where: { userId },
                }),
            ]);
        }

    } catch (error) {
        console.error('⚠️ Webhook Handling Error:', error);
        return new Response('Webhook handling error', { status: 500 });
    }

    return new Response('Webhook received', { status: 200 });
}
