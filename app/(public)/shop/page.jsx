'use client'
import { Suspense, useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)
    const [searchResults, setSearchResults] = useState(null)
    const [searchMode, setSearchMode] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!search) {
            setSearchResults(null);
            setSearchMode(null);
            return;
        }

        let isMounted = true;
        setIsLoading(true);

        fetch(`/api/search?q=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;
                if (data?.products) {
                    setSearchResults(data.products);
                    setSearchMode(data.mode);
                } else {
                    setSearchResults(products.filter(p =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    ));
                    setSearchMode('keyword');
                }
            })
            .catch(() => {
                if (!isMounted) return;
                setSearchResults(products.filter(p =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                ));
                setSearchMode('keyword');
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [search, products]);

    const displayedProducts = search ? (searchResults ?? []) : products;

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 my-6">
                    <h1 
                        onClick={() => router.push('/shop')} 
                        className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer hover:text-slate-700 transition"
                    >
                        {search && <MoveLeftIcon size={20} />}
                        {search ? (
                            <>Results for <span className="text-slate-800 font-medium">"{search}"</span></>
                        ) : (
                            <>All <span className="text-slate-700 font-medium">Products</span></>
                        )}
                    </h1>

                    {search && searchMode === 'semantic' && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium rounded-full">
                            <Sparkles size={13} className="text-indigo-600" />
                            <span>AI Semantic Search</span>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="py-20 text-center text-slate-500">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-indigo-600 mb-3"></div>
                        <p className="text-sm">Finding best matches...</p>
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-slate-600 text-lg mb-2">No products found matching "{search}"</p>
                        <p className="text-slate-400 text-sm mb-6">Try searching for other keywords, colors, or concepts.</p>
                        <button
                            onClick={() => router.push('/shop')}
                            className="px-5 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}