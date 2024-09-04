import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
    secret: "sk_dev_eFAnkzo_fIc4lKoAbnBX0XNA0gcTILnAr_3kCD8h8kHBIAEeG5ZABHyLe7OmLEkT",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();

    console.log('Auth Info : ', {
        authorization, user
    });


    if (!user || !authorization) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.get, { id: room });

    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName,
        picture: user.imageUrl
    }

    // Get the current user from your database
    // const user = __getUserFromDB__(request);

    // Start an auth session inside your endpoint
    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );

    // Use a naming pattern to allow access to rooms with wildcards
    // Giving the user read access on their org, and write access on their group
    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }
    // Authorize the user and return the result
    const { status, body } = await session.authorize();


    return new Response(body, { status });
}