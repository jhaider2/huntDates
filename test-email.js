// Test email sending functionality
// This script triggers the send-draw-reminders edge function

const SUPABASE_URL = 'https://awwxgisrefxhhihdhbha.supabase.co';
const SUPABASE_ANON_KEY = prompt('Enter your Supabase Anon Key:');

async function testEmailSending() {
    console.log('🧪 Testing email reminder function...\n');

    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/send-draw-reminders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Success!');
            console.log(`📧 Emails sent: ${data.emailsSent}`);
            console.log('\nFull response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ Error:', data.error);
            console.error('\nFull response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network error:', error.message);
    }
}

testEmailSending();
