import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';

const HomePage = () => {
    const logo = "/loop.svg";

    const [categoryBuffer, setCategoryBuffer] = useState([]);
    // const [totalCategory, setTotalCategory] = useState(0);
    const [navItems, setNavItems] = useState([
        { label: 'Home', href: '/' }
    ]);

    const fetchCategory = async () => {
        try {
            const res = await api.get(`/categories`);
            const categories = res.data.categories;
            setCategoryBuffer(categories);
            // setTotalCategory(res.data.totalCount);
            const formattedItems = categories.map(cat => ({
                label: cat.name,
                href: `/categories/${cat.slug}`
            }));
            setNavItems([
                { label: 'Home', href: '/' },
                ...formattedItems
            ]);
        } catch (error) {
            console.error('Lỗi xảy ra khi truy xuất category: ', error);
            toast("Lỗi xảy ra khi truy xuất category");
        }
    };

    // useEffect(() => {
    //     fetchCategory();
    // }, [])

    return (
        <div className="min-h-screen w-full relative">
            {/* Dashed Bottom Fade Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
                        repeating-linear-gradient(
                            to right,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                        ),
                        repeating-linear-gradient(
                            to bottom,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                        ),
                        radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                    `,
                    WebkitMaskImage: `
                        repeating-linear-gradient(
                            to right,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                        ),
                        repeating-linear-gradient(
                            to bottom,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                        ),
                        radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                    `,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            {/* Your Content/Components */}
            {/* Header */}
            <div className='flex justify-center'>
                <PillNav
                    logo={logo}
                    logoAlt="News Logo"
                    items={navItems}
                    activeHref="/"
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#5b7796"
                    pillColor="#c9d9ea"
                    hoveredPillTextColor="rgb(242, 242, 242)"
                    pillTextColor="#000"
                />
            </div>

            {/* Main content */}


            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default HomePage
