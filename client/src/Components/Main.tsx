import { useEffect, useState } from "react";
import { UserAPI } from "@/lib/services";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Main = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {

        FetchProfile();

    }, [])

    const FetchProfile = async () => {

        try {

            const response = await UserAPI();

            setUser(response);

        } catch (error) {

            router.push("/login");

        } finally {

            setIsLoading(false);

        }

    };

    const Logout = () => {

        Cookies.remove("token");

        router.push("/login");

    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen" >
                    <h1 className="text-4xl font-semibold">
                        Loading...
                    </h1>
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center h-screen gap-5">
                        <h1 className="text-3xl font-semibold">
                            {user?.firstName} {user?.lastName}
                        </h1>

                        <button
                            className="bg-white text-black py-2 px-4 text-md font-semibold rounded-md"
                            onClick={Logout}
                        >
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </>
    )
};

export default Main;