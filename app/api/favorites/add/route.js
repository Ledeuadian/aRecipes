import Favorite from "@/models/favorite"
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
    const { userId, recipeId } = await req.json();

    try {
        await connectToDB();
        const newFavorite = new Favorite({
            creator: userId,
            recipe: recipeId,
        })

        await newFavorite.save();

        return new Response(JSON.stringify(newFavorite, {status: 201}))

    } catch (error) {
        return new Response("Failed to create a new prompt", {status:500})
    }
}