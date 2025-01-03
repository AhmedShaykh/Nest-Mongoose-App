import withAuth from "@/guard/withAuth";
import Main from "@/Components/Main";

const Home = () => {
    return (
        <Main />
    )
};

export default withAuth(Home);