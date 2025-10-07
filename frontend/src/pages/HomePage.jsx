import React from 'react';
import PillNav from '../components/PillNav';

const HomePage = () => {
    const logo = "/loop.svg";
    return (
        <div className="min-h-screen w-full relative bg-black">
            {/* X Organizations Black Background with Top Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
                }}
            />

            {/* Your Content/Components */}
            <div className='flex justify-center'>
                <PillNav
                    logo={logo}
                    logoAlt="Company Logo"
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Category', href: '/category/:slug' }
                    ]}
                    activeHref="/"
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="hsla(216, 12%, 84%, 1.00)"
                    pillColor="hsl(217.2 32.6% 17.5%)"
                    hoveredPillTextColor="#000"
                    pillTextColor="hsl(212.7 26.8% 83.9%)"
                />
            </div>
        </div>
    )
}

export default HomePage
