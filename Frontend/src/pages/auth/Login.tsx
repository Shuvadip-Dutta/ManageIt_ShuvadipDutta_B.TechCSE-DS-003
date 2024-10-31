import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import api from "@/api/auth/index"

const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const fetchOrganizations = async () => {
    const response = await api.get('/organizations'); // Adjust endpoint if necessary
    return response.data.organizations; // Assuming your API returns an array of organizations
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await login({
        email,
        password,
      });

      const { token } = response; // Ensure you're accessing the token correctly

      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);

      // Fetch the user's organizations to get the orgId
      const organizationsResponse = await fetchOrganizations(); // Implement this function to get organizations
      if (organizationsResponse.length > 0) {
        const firstOrgId = organizationsResponse[0]._id; // Assuming organizations have an _id field
        navigate(`/organizations/${firstOrgId}`);
      } else {
        // Handle case where the user has no organizations
        toast({
          title: "Info",
          description: "You do not have any organizations.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.", // Use the error message returned from the login function
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 sm:p-8">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <img className="h-12 w-auto" src="/logo.svg" alt="Logo" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button
                onClick={() => navigate("/auth/forgot-password")}
                variant="link"
                className="text-sm px-0"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-full"
              size="lg"
            >
              Sign in
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Not a member? </span>
              <Button
                onClick={() => navigate("/auth/signup")}
                variant="link"
                className="text-sm px-1"
              >
                Sign up now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;
