import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            <a href="/cheapFlights" className="iconToPage">
                <dotlottie-player style={{ pointerEvents: "none"}}src="https://lottie.host/b46fd541-2c1b-49e0-91fc-88d1067765c6/4Lcjwv8xQr.json" background="transparent" speed="0.8" loop autoplay></dotlottie-player>
            </a>
            <a href="/bestDepartFlights" className="iconToPage">
                <dotlottie-player style={{ transform: 'scale(2)', pointerEvents: "none", overflow: "hidden"}} src="https://lottie.host/802f258b-8899-4e64-8c35-5f9dca55d76f/LXY2aTeTTs.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
            </a>
        </div>
    );
};

export default Home;