import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import { setOTPSent, setUser } from "../../features/auth/authSlice";
import { toast } from "sonner";
import ProgressIndicator from "../../components/Form/ProgressIndicator";
import UserDetails from "../../components/Form/UserDetails";
import CompanyDetails from "../../components/Form/CompanyDetails";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      setValue("email", email);
    } else {
      return <Navigate to="/" />;
    }
    dispatch(setOTPSent(false));
    return () => {
      reset();
    };
  }, [email, setValue, reset, dispatch]);

  const onSubmit = async (data) => {
    if (step === 1) {
      // Validate step 1 fields
      const isValid = await trigger(["email", "username", "phone", "password"]);
      if (isValid) {
        setStep(2);
        toast.success("Step 1 completed! Proceed to Step 2.");
      }
    } else {
      try {
        const result = await registerUser(data).unwrap();
        dispatch(setUser(result?.data));
        toast.success("Registration successful! Redirecting to dashboard...");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to register user:", error);
        toast.error(
          `Registration failed: ${error.data?.message || "Please try again"}`
        );
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <ProgressIndicator currentStep={step - 1} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <UserDetails register={register} errors={errors} />
          ) : (
            <CompanyDetails register={register} errors={errors} />
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                Previous
              </button>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 ${
                step === 1 ? "ml-auto" : ""
              }`}>
              {isRegistering
                ? "Registering..."
                : step === 1
                ? "Next"
                : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
