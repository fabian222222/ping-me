import Header from "../homepage/Header";
import HeroSection from "../homepage/HeroSection";
import WhyUsSection from "../homepage/WhyUsSection";
import SignUpReminder from "../homepage/SignUpReminder";
import Footer from "../homepage/Footer";

const Homepage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-8">
                <Header />

                <main>
                    <HeroSection />
                    <WhyUsSection />
                    <SignUpReminder />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Homepage;
