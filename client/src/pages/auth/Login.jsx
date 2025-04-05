import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useSendOTPMutation,
  useLoginUserMutation,
} from "../../features/auth/authApi";
import { setOTPSent, setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import PasswordLogin from "../../components/Form/LoginPassword";

const Login = () => {
  const [activeTab, setActiveTab] = useState("otp");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOTP, { isLoading: otpLoading }] = useSendOTPMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  useEffect(() => {
    dispatch(setOTPSent(false));
  }, []);

  // OTP Form
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm();

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();

  const onOtpSubmit = async (data) => {
    try {
      await sendOTP(data?.email).unwrap();
      dispatch(setOTPSent(true));
      toast.success("OTP sent successfully!");
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      dispatch(setUser(result?.data));
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="otp">Login with OTP</TabsTrigger>
              <TabsTrigger value="password">Login with Password</TabsTrigger>
            </TabsList>

            {/* OTP Login */}
            <TabsContent value="otp">
              <form
                onSubmit={handleOtpSubmit(onOtpSubmit)}
                className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...registerOtp("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {otpErrors.email && (
                    <p className="text-sm text-destructive">
                      {otpErrors.email.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {otpLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </TabsContent>

            {/* Password Login */}
            <TabsContent value="password">
              <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="space-y-4 mt-4">
                <PasswordLogin
                  register={registerPassword}
                  errors={passwordErrors}
                  isLoading={loginLoading}
                />
                <Button type="submit" className="w-full">
                  {loginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
