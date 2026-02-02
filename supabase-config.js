// Supabase configuration
const SUPABASE_URL = 'https://awwxgisrefxhhihdhbha.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3d3hnaXNyZWZ4aGhpaGRoYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjMxNTcsImV4cCI6MjA4NTQ5OTE1N30.cH-beXboF5zwQdMV8ar9pJUbr4UN5LkMJzXVTe4lp2k';

// Initialize Supabase client - use the global supabase from CDN
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export as supabase for use in other files
window.supabaseClient = _supabase;
