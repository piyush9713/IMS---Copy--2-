import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyOTPMutation } from "../../features/auth/authApi";
import { setOTPVerified, setUser } from "../../features/auth/authSlice";
import { toast } from "sonner";
import InputOtp from "../../components/Form/InputOtp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const VerifyOtp = () => {
  const location = useLocation();
  const email = location?.state?.email || "";
  const [otp, setOtp] = useState("");
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpSent } = useSelector((state) => state.auth);

  if (!email || !otpSent) {
    return <Navigate to="/" />;
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const result = await verifyOTP({ email, otp }).unwrap();
      if (result?.data?.user) {
        console.log(result);
        dispatch(setUser(result.data));
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      } else {
        dispatch(setOTPVerified(true));
        toast.success("OTP verified. Please complete your registration.");
        navigate("/register", { state: { email } });
      }
      dispatch(setOTPVerified(true));
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verify OTP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              readOnly
              className="cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <Label>Enter OTP</Label>
            <InputOtp onChange={setOtp} onSubmit={handleVerify} />
          </div>
          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full">
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
