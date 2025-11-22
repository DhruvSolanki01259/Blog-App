export const contactEmailTemplate = (name, email, message) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #111827;
      line-height: 1.5;
    }

    a { color: #FA9500; text-decoration: none; }

    .container {
      max-width: 640px;
      width: 90%;
      margin: 40px auto;
      border: 2px solid #FA9500;
      border-radius: 16px;
      padding: 32px;
      background-color: #ffffff;
      box-shadow: 0 4px 16px rgba(250,149,0,0.2);
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
    }

    .sender-info {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #EB6424;
    }

    .sender-info p {
      margin: 4px 0;
    }

    .message-box {
      padding: 24px;
      border: 2px solid #FFDAC6;
      border-radius: 16px;
      box-shadow: 0 0 20px rgba(255,218,198,0.5);
      background-color: #fff9f4;
      margin-bottom: 24px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }

    @media (prefers-color-scheme: dark) {
      body { background-color: #111827; color: #f3f3f3; }
      .container { border-color: #FA9500; background-color: #1f2937; }
      .sender-info { border-color: #EB6424; }
      .message-box { border-color: #FA9500; box-shadow: 0 0 16px rgba(250,149,0,0.5); background-color: #111827; }
      a { color: #FA9500; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Blogify Contact</h1>
    </div>

    <!-- Sender Info -->
    <div class="sender-info">
      <p><strong>Sender Name:</strong> ${name}</p>
      <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
    </div>

    <!-- Message -->
    <div class="message-box">
      <p>${message}</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      This email was sent via <strong>Blogify</strong> contact form.<br>
      © ${new Date().getFullYear()} Blogify. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
