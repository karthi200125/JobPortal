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
        console.error("Webhook Signature Verification Failed:", err);
        return new Response(
            `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
            { status: 400 }
        );
    }

    const object = event.data.object as any;
    let userId: number | null = null;
    let subscription: Stripe.Subscription | null = null;

    if (object?.metadata?.userId) {
        userId = Number(object.metadata.userId);
    }

    try {
        /** ✅ Handle New Subscription Purchase **/
        if (event.type === 'checkout.session.completed' && object.subscription) {
            subscription = await stripe.subscriptions.retrieve(object.subscription as string);
            console.log('Subscription created:', subscription.id);

            await db.$transaction([
                db.user.update({
                    where: { id: userId! },
                    data: { isPro: true, updatedAt: new Date() },
                }),
                db.subscription.upsert({
                    where: { userId: userId! },
                    update: {
                        stripeSubscriptionId: subscription.id,
                        stripeCustomerId: subscription.customer as string,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        subscriptionStatus: subscription.status,
                        planName: object.metadata.planName,
                        billingInterval: object.metadata.subscriptionType,
                        amount: subscription.items.data[0].price.unit_amount! / 100,
                    },
                    create: {
                        userId: userId!,
                        stripeSubscriptionId: subscription.id,
                        stripeCustomerId: subscription.customer as string,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        subscriptionStatus: subscription.status,
                        planName: object.metadata.planName,
                        billingInterval: object.metadata.subscriptionType,
                        amount: subscription.items.data[0].price.unit_amount! / 100,
                    },
                }),
            ]);
        }

        /** ✅ Handle Successful Subscription Renewal **/
        if (event.type === 'invoice.payment_succeeded' && userId) {
            console.log('Invoice payment succeeded for user:', userId);
            await db.user.update({
                where: { id: userId },
                data: { isPro: true, updatedAt: new Date() },
            });
        }

        /** ✅ Handle Subscription Cancellation (User Cancels Plan) **/
        if (event.type === 'customer.subscription.updated') {
            subscription = await stripe.subscriptions.retrieve(object.id);

            if (subscription.status === 'canceled' && userId) {
                console.log('Subscription canceled by user:', userId);

                await db.$transaction([
                    db.user.update({
                        where: { id: userId },
                        data: { isPro: false, updatedAt: new Date() },
                    }),
                    db.subscription.update({
                        where: { userId },
                        data: { subscriptionStatus: 'inactive' },
                    }),
                ]);
            }
        }

        /** ✅ Handle Subscription Expiry (Stripe Deletes Subscription) **/
        if (event.type === 'customer.subscription.deleted') {
            console.log('Subscription expired for user:', userId);

            await db.$transaction([
                db.user.update({
                    where: { id: userId! },
                    data: { isPro: false, updatedAt: new Date() },
                }),
                db.subscription.deleteMany({
                    where: {
                        userId: userId!
                    },
                }),
            ]);
        }

        /** ✅ Handle Payment Failure (Card Declined, Insufficient Funds) **/
        if (event.type === 'invoice.payment_failed' && userId) {
            console.log('Payment failed for user:', userId);

            await db.user.update({
                where: { id: userId },
                data: { isPro: false, updatedAt: new Date() },
            });
        }
    } catch (error) {
        console.error('Webhook Handling Error:', error);
        return new Response('Webhook handling error', { status: 500 });
    }

    return new Response('Webhook received', { status: 200 });
}
