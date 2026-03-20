import React from 'react'
import Hero from '../components/Hero'
import MoonPhases from '../components/MoonPhases'
import MembershipCTA from '../components/MembershipCTA'
import BirthChart from '../components/BirthChart'
import ZodiacFan from '../components/ZodiacFan'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import ZodiacWheel from '../components/ZodiacWheel'
import DailyHoroscope from '../components/DailyHoroscope'
import AuroraBackground from '../components/AuroraBackground'
import FloatingOrbs from '../components/FloatingOrbs'

const SectionDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '20px auto', opacity: 0.6, padding: '20px 48px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196, 51, 153, 0.6))' }} />
        <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', background: '#c43399', margin: '0 16px', boxShadow: '0 0 8px #c43399' }} />
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(196, 51, 153, 0.6))' }} />
    </div>
);

const Home = () => {
    return (
        <main style={{ width: '100%', position: 'relative', zIndex: 10, paddingTop: '161px' }}>
            <AuroraBackground />
            <FloatingOrbs />
            <ZodiacWheel />
            <Hero />
            <SectionDivider />
            <DailyHoroscope />
            <SectionDivider />
            <ZodiacFan />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <MembershipCTA />
            <SectionDivider />
            <BirthChart />
            <SectionDivider />
            <MoonPhases />
            <SectionDivider />
            <Newsletter />
        </main>
    )
}

export default Home
