import { useState } from "react";
import { sendOtpForRegistration, verifyOtpForRegistration, completeRegistration } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtpForRegistration({ email });
      setStep(2); // Proceed to the next step
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to send OTP. Please try again.",
      });
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtpForRegistration({ email, otp });
      setStep(3); // Proceed to the next step
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to verify OTP. Please check and try again.",
      });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }
    try {
      await completeRegistration({
        email,
        name,
        // phoneNum, // Include if required by your API
        password,
        confirmPassword,
      });
      toast({
        title: "Success",
        description: "Registration completed successfully.",
      });
      navigate("/auth/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to complete registration. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Logo" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 && "Enter your email to get started"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Set up your password"}
          </p>
        </div>

        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Send OTP
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleFinalSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        )}

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Button
            onClick={() => navigate("/auth/login")}
            variant="link"
            className="font-medium text-indigo-600 hover:text-indigo-500 px-1"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
