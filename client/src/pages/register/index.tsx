import Register from "@/Components/Register";
import withAuth from "@/guard/withAuth";

const RegisterPage = () => {
    return (
        <Register />
    )
};

export default withAuth(RegisterPage);