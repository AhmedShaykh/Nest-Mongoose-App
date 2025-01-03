import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const withAuth = (Component: React.ComponentType<any>) => {

    const AuthenticatedComponent = (props: any) => {

        const pathname = usePathname();

        const router = useRouter();

        useEffect(() => {

            const token = localStorage.getItem("token");

            if (!token && pathname === "/login") {

                router.replace("/login");

            } else if (!token && pathname === "/register") {

                router.replace("/register");

            } else if (token && (pathname === "/login" || pathname === "/register")) {

                router.replace("/");

            } else if (!token && pathname === "/") {

                router.replace("/login");

            }

        }, [router]);

        return <Component {...props} />;
    };

    AuthenticatedComponent.displayName = `WithAuth(${Component.displayName || Component.name || "Component"})`;

    return AuthenticatedComponent;

};

export default withAuth;