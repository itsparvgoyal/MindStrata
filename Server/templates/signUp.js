require("dotenv").config();

const signupTemplate = (name) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome to MindStrata</title>
  </head>
  <body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="max-width:560px; margin:40px auto; background:#ffffff; border-radius:16px; border:1px solid #e4e4e7; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
          <!-- Header -->
          <div style="background:#09090b; padding:32px 20px; text-align:center;">
              <span style="font-size:22px; font-weight:800; color:#ffffff; tracking:-0.05em; font-family:'Outfit', Arial, sans-serif;">
                  MindStrata 🚀
              </span>
          </div>
          <!-- Body -->
          <div style="padding:40px; color:#18181b;">
              <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:700; color:#09090b; letter-spacing:-0.02em;">
                  Welcome Onboard, ${name}!
              </h2>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 16px 0;">
                  We are absolutely thrilled to have you join our learning community. Your account has been successfully created and is ready to go!
              </p>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 28px 0;">
                  You can now explore courses, track your learning milestones, and master real-world software development skills with MindStrata.
              </p>
              <!-- CTA Button -->
              <div style="text-align:center; margin:32px 0;">
                  <a href="${process.env.Frontend_Login_Page_URL}" style="
                      background:#09090b;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 32px;
                      border-radius:30px;
                      display:inline-block;
                      font-weight:700;
                      font-size:14px;
                      border:1px solid #27272a;
                      box-shadow:0 4px 12px rgba(0,0,0,0.08);
                  ">
                      Start Learning
                  </a>
              </div>
              <p style="font-size:14px; color:#71717a; line-height:1.6; margin:0;">
                  If you did not sign up for this account, you can safely ignore this email.
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

module.exports = signupTemplate;
