#!/bin/bash

# Test email sending for Draw Tracker
# This script calls the Supabase edge function that sends reminder emails

echo "🧪 Testing Draw Tracker Email Reminders"
echo "========================================"
echo ""

# Set the anon key
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3d3hnaXNyZWZ4aGhpaGRoYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjMxNTcsImV4cCI6MjA4NTQ5OTE1N30.cH-beXboF5zwQdMV8ar9pJUbr4UN5LkMJzXVTe4lp2k"

echo "📡 Calling edge function..."
echo ""

# Call the edge function
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json" \
    https://awwxgisrefxhhihdhbha.supabase.co/functions/v1/send-draw-reminders)

# Split response body and status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_STATUS=$(echo "$RESPONSE" | tail -n 1)

echo "📊 Status Code: $HTTP_STATUS"
echo ""

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ Success!"
    echo ""
    echo "Response:"
    echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
else
    echo "❌ Error occurred"
    echo ""
    echo "Response:"
    echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
fi

echo ""
echo "========================================"
echo "📝 Next steps:"
echo "  1. Check the response above for 'emailsSent' count"
echo "  2. Check your email inbox"
echo "  3. Check Supabase logs for detailed output"
echo ""
