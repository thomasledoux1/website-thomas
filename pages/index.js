import dynamic from 'next/dynamic';

const Home = dynamic(
    () => import("./home"),
    {
        ssr: false
    }
);

const Index = () => {
    return (
        <Home />
    )
};

export default Index;