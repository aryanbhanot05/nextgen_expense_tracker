/**
 * Authentication Page
 * Handles both sign in and sign up flows with beautiful glassmorphism UI
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, TrendingUp, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (!error) {
          navigate('/dashboard');
        }
      } else {
        const { error } = await signIn(email, password);
        if (!error) {
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <Card className="glass-card max-w-md w-full relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-secondary to-accent rounded-2xl glow">
              <Waves className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            NextGen Expense Tracker
          </CardTitle>
          <CardDescription className="text-base">
            {isSignUp 
              ? 'Create your account to start tracking expenses' 
              : 'Sign in to manage your finances'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isSignUp}
                  className="glass"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="glass"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity glow-hover"
              disabled={loading}
            >
              {loading ? (
                'Loading...'
              ) : isSignUp ? (
                <>
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {isSignUp ? (
                <>Already have an account? <span className="font-semibold text-accent">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="font-semibold text-accent">Sign Up</span></>
              )}
            </button>
          </div>

          {/* Features preview */}
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Track expenses with beautiful insights</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Waves className="h-5 w-5 text-secondary" />
              <span>Smart budgeting and forecasting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
