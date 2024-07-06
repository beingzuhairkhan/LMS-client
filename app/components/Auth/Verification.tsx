import React, { FC, useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
// import { useActivationMutation } from '@/redux/features/auth/authApi';
import { useActivationMutation } from '../../../redux/features/auth/authApi';
type Props = {
    setRoute: (route: string) => void;
};

type VerifyNumber = {
    [key: number]: string;
};

const Verification: FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: '',
        1: '',
        2: '',
        3: ''
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            setRoute("Login");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                if (errorData.data && errorData.data.message) {
                    toast.error(errorData.data.message);
                } else {
                    toast.error("An unknown error occurred");
                }
            } else {
                console.error("An error occurred:", error);
                toast.error("An unknown error occurred");
            }
            // Clear the OTP input fields and set invalidError to true
            setVerifyNumber({ 0: '', 1: '', 2: '', 3: '' });
            setInvalidError(true);
        }
    }, [isSuccess, error, setRoute]);

    const verificationHandler = async () => {
        const verificationCode = Object.values(verifyNumber).join('');
        if (verificationCode.length !== 4) {
            setInvalidError(true);
            return;
        } else {
            setInvalidError(false);
            try {
                await activation({ activation_token: token, activation_code: verificationCode });
            } catch (activationError) {
                console.error('Activation error:', activationError);
                toast.error("Activation failed. Please try again.");
                // Clear the OTP input fields and set invalidError to true
                setVerifyNumber({ 0: '', 1: '', 2: '', 3: '' });
                setInvalidError(true);
            }
        }
    };

    const handleInputChange = (index: number, value: string) => {
        if (/^\d$/.test(value)) {
            setInvalidError(false);
            const newVerifyNumber = { ...verifyNumber, [index]: value };
            setVerifyNumber(newVerifyNumber);
            if (index < 3 && value) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' && !verifyNumber[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="p-8 w-full max-w-sm dark:text-white text-black sm:p-6 ">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white text-black">Verification</h2>
            <div className="flex justify-center space-x-2">
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={verifyNumber[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-12 h-12 text-center text-2xl border ${invalidError ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                ))}
            </div>
            {invalidError && (
                <p className="text-red-500 text-sm mt-2 text-center">Invalid verification code</p>
            )}
            <button
                onClick={verificationHandler}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Verify OTP
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">Go back to sign-in?
                <button
                    className="text-blue-500 hover:underline ml-2"
                    onClick={() => setRoute('Login')}
                >
                    Sign In
                </button>
            </p>
        </div>
    );
};

export default Verification;
