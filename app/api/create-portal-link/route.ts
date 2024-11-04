import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

async function POST() {
  const supabase = createRouteHandlerClient({
    cookies,
  });
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Could not get user");

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    });

    if (!customer) throw new Error("Could not get customer");

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL}/`,
    });

    return NextResponse.json({ url });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(`Internal Error`, { status: 500 });
  }
}
