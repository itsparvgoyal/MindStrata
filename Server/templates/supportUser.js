const supportUserTemplate = (name, queryRegarding) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Support Request Received</title>
  </head>
  <body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="max-width:560px; margin:40px auto; background:#ffffff; border-radius:16px; border:1px solid #e4e4e7; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
          <!-- Header -->
          <div style="background:#09090b; padding:32px 20px; text-align:center;">
              <span style="font-size:22px; font-weight:800; color:#ffffff; tracking:-0.05em; font-family:'Outfit', Arial, sans-serif;">
                  MindStrata Support
              </span>
          </div>
          <!-- Body -->
          <div style="padding:40px; color:#18181b;">
              <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:700; color:#09090b; letter-spacing:-0.02em;">
                  Hello ${name},
              </h2>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 16px 0;">
                  We have successfully received your support query regarding <strong>${queryRegarding}</strong>.
              </p>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 28px 0;">
                  Our support team is currently reviewing your request. We will investigate the details and get back to you as soon as possible (usually within 24 hours).
              </p>
              <div style="
                  background:#f4f4f5;
                  padding:18px;
                  border-left:4px solid #09090b;
                  border-radius:8px;
                  margin:28px 0;
              ">
                  <p style="margin:0; font-size:14px; color:#52525b; line-height:1.5;">
                      No further action is required on your part. A support ticket has been automatically created for your issue.
                  </p>
              </div>
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

module.exports = supportUserTemplate;
