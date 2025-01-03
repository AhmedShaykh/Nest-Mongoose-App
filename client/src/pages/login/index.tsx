import withAuth from "@/guard/withAuth";
import Login from "@/Components/Login";

const LoginPage = () => {
    return (
        <Login />
    )
};

export default withAuth(LoginPage);