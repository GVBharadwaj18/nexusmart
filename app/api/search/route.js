import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getEmbedding } from "@/lib/embeddings";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = (searchParams.get("q") || "").trim();

        if (!query) {
            return NextResponse.json({ products: [], mode: "empty" });
        }

        let semanticProducts = [];

        // 1. Generate query embedding using Google Gemini
        const queryVector = await getEmbedding(query);

        if (queryVector && queryVector.length > 0) {
            const vectorString = `[${queryVector.join(",")}]`;

            // Cosine distance in pgvector: <=>
            // Similarity: 1 - cosine_distance
            const rawResults = await prisma.$queryRaw`
                SELECT p.id, p.name, p.description, p.mrp, p.price, p.images, p.category, 
                       p."inStock", p.stock, p."storeId", p."createdAt",
                       (1 - (p.embedding <=> ${vectorString}::vector)) AS similarity
                FROM "Product" p
                JOIN "Store" s ON p."storeId" = s.id
                WHERE p."inStock" = true 
                  AND s."isActive" = true
                  AND p.embedding IS NOT NULL
                ORDER BY p.embedding <=> ${vectorString}::vector ASC
                LIMIT 20;
            `;

            if (rawResults && rawResults.length > 0) {
                // Fetch product ratings
                const productIds = rawResults.map((p) => p.id);
                const ratings = await prisma.rating.findMany({
                    where: { productId: { in: productIds } },
                    select: { productId: true, rating: true, review: true }
                });

                const ratingMap = new Map();
                for (const r of ratings) {
                    if (!ratingMap.has(r.productId)) ratingMap.set(r.productId, []);
                    ratingMap.get(r.productId).push(r);
                }

                semanticProducts = rawResults
                    .filter((p) => Number(p.similarity) > 0.35)
                    .map((p) => ({
                        ...p,
                        similarity: Math.round(Number(p.similarity) * 100),
                        rating: ratingMap.get(p.id) || []
                    }));

                if (semanticProducts.length > 0) {
                    return NextResponse.json({
                        products: semanticProducts,
                        mode: "semantic"
                    });
                }
            }
        }

        // 2. Fallback: Full-Text / Keyword search if embedding unavailable or no matches
        const fallback = await prisma.product.findMany({
            where: {
                inStock: true,
                store: { isActive: true },
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } }
                ]
            },
            include: {
                rating: { select: { rating: true, review: true } }
            },
            take: 20
        });

        return NextResponse.json({
            products: fallback,
            mode: "keyword"
        });

    } catch (error) {
        console.error("Semantic search error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
