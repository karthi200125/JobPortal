"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
    typescript: true
});

export async function StripeCustomerPortal(stripeCustomerId: string) {
    try {
        if (!stripeCustomerId) {
            throw new Error("Missing required parameters: userId, or stripeCustomerId.");
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_URL}/subscription`
        });

        return { sessionUrl: portalSession.url };
    } catch (error) {
        console.error("Error creating Stripe customer portal session:", error);
        return { error: "Failed to create Stripe customer portal session." };
    }
}
