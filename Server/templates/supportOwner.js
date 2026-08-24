const supportOwnerTemplate = (name, email, mobileNumber, queryRegarding, message) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>New Support Request</title>
  </head>
  <body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="max-width:560px; margin:40px auto; background:#ffffff; border-radius:16px; border:1px solid #e4e4e7; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.03);">
          <!-- Header -->
          <div style="background:#ef4444; padding:32px 20px; text-align:center;">
              <span style="font-size:22px; font-weight:800; color:#ffffff; tracking:-0.05em; font-family:'Outfit', Arial, sans-serif;">
                  New Support Ticket 🚨
              </span>
          </div>
          <!-- Body -->
          <div style="padding:40px; color:#18181b;">
              <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:700; color:#09090b; letter-spacing:-0.02em;">
                  Ticket Details
              </h2>
              <p style="font-size:15px; line-height:1.6; color:#52525b; margin:0 0 24px 0;">
                  A user has submitted a support request. Here are the details:
              </p>
              
              <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px; line-height:1.5;">
                  <tr>
                      <td style="padding:8px 0; font-weight:600; color:#09090b; width:130px; border-bottom:1px solid #f4f4f5;">User Name:</td>
                      <td style="padding:8px 0; color:#52525b; border-bottom:1px solid #f4f4f5;">${name}</td>
                  </tr>
                  <tr>
                      <td style="padding:8px 0; font-weight:600; color:#09090b; border-bottom:1px solid #f4f4f5;">User Email:</td>
                      <td style="padding:8px 0; color:#52525b; border-bottom:1px solid #f4f4f5;"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
                  </tr>
                  <tr>
                      <td style="padding:8px 0; font-weight:600; color:#09090b; border-bottom:1px solid #f4f4f5;">Phone Number:</td>
                      <td style="padding:8px 0; color:#52525b; border-bottom:1px solid #f4f4f5;">${mobileNumber}</td>
                  </tr>
                  <tr>
                      <td style="padding:8px 0; font-weight:600; color:#09090b; border-bottom:1px solid #f4f4f5;">Regarding:</td>
                      <td style="padding:8px 0; color:#52525b; border-bottom:1px solid #f4f4f5;"><strong>${queryRegarding}</strong></td>
                  </tr>
              </table>

              <h3 style="margin:0 0 10px 0; font-size:15px; font-weight:700; color:#09090b;">User Message:</h3>
              <div style="
                  background:#f4f4f5;
                  padding:18px;
                  border-radius:12px;
                  border:1px solid #e4e4e7;
                  font-size:14px;
                  color:#18181b;
                  line-height:1.6;
                  white-space:pre-wrap;
                  margin-bottom:28px;
              ">${message}</div>

              <hr style="margin:32px 0 24px 0; border:none; border-top:1px solid #e4e4e7;" />
              <p style="font-size:12px; color:#a1a1aa; text-align:center; margin:0; line-height:1.5;">
                  © ${new Date().getFullYear()} MindStrata Admin Console.<br/>
                  Please reply to the user directly at their email address.
              </p>
          </div>
      </div>
  </body>
  </html>
  `;
};

module.exports = supportOwnerTemplate;
