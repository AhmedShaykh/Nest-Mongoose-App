import { useState } from "react";
import { RegisterAPI } from "@/lib/services";
import { useRouter } from "next/router";

const Register = () => {

    const [formData, setFormData] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        if (formData.firstName === "") {

            alert("First Name Is Required!");

        } else if (formData.lastName === "") {

            alert("Last Name Is Required!");

        } else if (formData.email === "") {

            alert("Email Is Required!");

        } else if (formData.password === "") {

            alert("Password Is Required!");

        }

        try {

            const response: any = await RegisterAPI(formData);

            if (!response) alert("User Not Create!");

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });

            router.push("/login");

        } catch (error) {

            alert(`Error. ${error}`);

        }

    };

    return (
        <div className="text-white h-screen">
            <form
                className="flex flex-col items-center justify-center space-y-6 h-full font-medium"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        First Name:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="text-sm p-2 rounded-md w-80 text-black"
                        placeholder="Enter Your First Name"
                        value={formData.firstName}
                        type="firstName"
                        name="firstName"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        Last Name:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="text-sm p-2 rounded-md w-80 text-black"
                        placeholder="Enter Your Last Name"
                        value={formData.lastName}
                        type="lastName"
                        name="lastName"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        Email:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-sm p-2 rounded-md w-80 text-black"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        type="email"
                        name="email"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        Password:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="text-sm p-2 rounded-md w-80 text-black"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        type="password"
                        name="password"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <button
                        className="bg-white text-black py-2 px-4 text-md font-bold rounded-md mt-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Register;