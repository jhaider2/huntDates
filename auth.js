// Authentication functionality with Supabase

// Handle login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get supabase client
        const supabase = window.supabaseClient;

        if (!supabase) {
            alert('Error: Authentication system not loaded. Please refresh the page.');
            return;
        }

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Disable submit button to prevent double submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Success - redirect to settings page
            alert('Login successful!');
            window.location.href = 'settings.html';
        } catch (error) {
            alert('Login failed: ' + error.message);
            console.error('Login error:', error);
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
        }
    });
}

// Handle signup form submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get supabase client
        const supabase = window.supabaseClient;

        if (!supabase) {
            alert('Error: Authentication system not loaded. Please refresh the page.');
            return;
        }

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const passwordConfirm = document.getElementById('signup-password-confirm').value;

        // Check if passwords match
        if (password !== passwordConfirm) {
            alert('Passwords do not match!');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Disable submit button to prevent double submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;

            console.log('Signup successful:', data);

            // Check if user already exists (Supabase returns a user object but with identities: [])
            if (data.user && data.user.identities && data.user.identities.length === 0) {
                alert('An account with this email already exists. Please sign in instead.');
                window.location.href = 'login.html';
                return;
            }

            // Check if email confirmation is required
            if (data.user && !data.user.confirmed_at) {
                alert('Account created successfully! Please check your email to confirm your account before logging in.');
                window.location.href = 'login.html';
            } else {
                // Auto-confirmed, redirect to settings
                alert('Account created successfully! Redirecting to your settings...');
                window.location.href = 'settings.html';
            }
        } catch (error) {
            // Handle specific error messages
            let errorMessage = error.message;

            if (error.message.includes('already registered') || error.message.includes('already exists')) {
                errorMessage = 'An account with this email already exists. Please sign in instead.';
            } else if (error.message.includes('invalid email')) {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.message.includes('password')) {
                errorMessage = 'Password must be at least 6 characters long.';
            }

            alert('Signup failed: ' + errorMessage);
            console.error('Signup error:', error);
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    });
}
