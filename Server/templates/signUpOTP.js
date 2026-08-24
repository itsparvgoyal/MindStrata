const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="max-width:560px; margin:40px auto; background:#ffffff; border-radius:16px; border:1px solid #e4e4e7; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
          <!-- Header -->
          <div style="background:#09090b; padding:32px 20px; text-align:center;">
              <span style="font-size:22px; font-weight:800; color:#ffffff; tracking:-0.05em; font-family:'Outfit', Arial, sans-serif;">
                  MindStrata
              </span>
          </div>
          <!-- Body -->
          <div style="padding:40px; color:#18181b;">
              <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:700; color:#09090b; letter-spacing:-0.02em;">
                  Verify Your Email Address
              </h2>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 24px 0;">
                  Thank you for creating an account with MindStrata. To complete your registration, please use the following one-time password (OTP):
              </p>
              <!-- OTP Box -->
              <div style="text-align:center; margin:32px 0;">
                  <span style="
                      display:inline-block;
                      background:#f4f4f5;
                      border:1px solid #e4e4e7;
                      color:#09090b;
                      font-size:32px;
                      font-family:'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                      letter-spacing:6px;
                      padding:14px 28px;
                      border-radius:12px;
                      font-weight:700;
                  ">
                      ${otp}
                  </span>
              </div>
              <p style="font-size:14px; color:#71717a; line-height:1.6; margin:0 0 8px 0;">
                  • This code is valid for <strong>1 minutes</strong>.
              </p>
              <p style="font-size:14px; color:#71717a; line-height:1.6; margin:0 0 24px 0;">
                  • If you did not request this, you can safely ignore this email.
              </p>
              <hr style="margin:32px 0 24px 0; border:none; border-top:1px solid #e4e4e7;" />
              <p style="font-size:12px; color:#a1a1aa; text-align:center; margin:0; line-height:1.5;">
                  © ${new Date().getFullYear()} MindStrata. All rights reserved.<br/>
                  Shaping the future of tech learning.
              </p>
          </div>
      </div>
  </body>
  </html>
  `;
};

module.exports = otpTemplate;
