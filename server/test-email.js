
import dotenv from 'dotenv';
import { testEmailConfig, sendVerificationEmail } from './email.js';

dotenv.config();

async function runTest() {
    console.log('--- Email Configuration Test ---');
    console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'not set (using SMTP)');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || '587');
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('-------------------------------');

    console.log('Testing connection to email server...');
    const isReady = await testEmailConfig();

    if (isReady) {
        console.log('✅ Connection successful!');

        // Optional: Send a test email if a recipient is provided
        const testRecipient = process.argv[2];
        if (testRecipient) {
            console.log(`Sending test verification email to: ${testRecipient}...`);
            const result = await sendVerificationEmail(testRecipient, 'Test User', 'test-token-12345');
            if (result.success) {
                console.log('✅ Test email sent successfully!');
            } else {
                console.log('❌ Failed to send test email:', result.error);
            }
        } else {
            console.log('Tip: Run "node test-email.js your-email@example.com" to send a test email.');
        }
    } else {
        console.log('❌ Connection failed. Please check your credentials and SMTP settings.');
        console.log('\nCommon issues:');
        console.log('1. If using Gmail, you MUST use an "App Password", not your regular password.');
        console.log('2. Check if your VPS provider allows outgoing traffic on port 587 or 465.');
        console.log('3. Ensure your .env file is present and has correct values.');
    }
}

runTest().catch(err => {
    console.error('Fatal error during test:', err);
});
