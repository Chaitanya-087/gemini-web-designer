import os
import google.generativeai as genai

from dotenv import load_dotenv, dotenv_values 
load_dotenv() 

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
generation_config = {
  "temperature": 2,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="generate html and css code donot give comments",
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "create home page with navbar and banner",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\"html\": \"<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n    <meta charset=\\\"UTF-8\\\">\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n    <title>Home Page</title>\\n    <style>\\n        body {\\n            margin: 0;\\n            font-family: sans-serif;\\n        }\\n        \\n        .navbar {\\n            background-color: #333;\\n            color: #fff;\\n            padding: 10px 0;\\n            text-align: center;\\n        }\\n        \\n        .navbar a {\\n            color: #fff;\\n            text-decoration: none;\\n            padding: 10px 20px;\\n            margin: 0 10px;\\n        }\\n        \\n        .banner {\\n            background-image: url(\\\"banner_image.jpg\\\"); /* Replace with your image path */\\n            background-size: cover;\\n            height: 300px;\\n            display: flex;\\n            justify-content: center;\\n            align-items: center;\\n            color: #fff;\\n            text-align: center;\\n        }\\n        \\n        .banner h1 {\\n            font-size: 3em;\\n            font-weight: bold;\\n        }\\n    </style>\\n</head>\\n<body>\\n    <div class=\\\"navbar\\\">\\n        <a href=\\\"#\\\">Home</a>\\n        <a href=\\\"#\\\">About</a>\\n        <a href=\\\"#\\\">Contact</a>\\n    </div>\\n    \\n    <div class=\\\"banner\\\">\\n        <h1>Welcome to Our Website</h1>\\n    </div>\\n</body>\\n</html>\", \"css\": \"body {\\n    margin: 0;\\n    font-family: sans-serif;\\n}\\n\\n.navbar {\\n    background-color: #333;\\n    color: #fff;\\n    padding: 10px 0;\\n    text-align: center;\\n}\\n\\n.navbar a {\\n    color: #fff;\\n    text-decoration: none;\\n    padding: 10px 20px;\\n    margin: 0 10px;\\n}\\n\\n.banner {\\n    background-image: url(\\\"banner_image.jpg\\\"); /* Replace with your image path */\\n    background-size: cover;\\n    height: 300px;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    color: #fff;\\n    text-align: center;\\n}\\n\\n.banner h1 {\\n    font-size: 3em;\\n    font-weight: bold;\\n}\"}\n\n```",
      ],
    },
  ]
)

response = chat_session.send_message("create about page with text and image")

print(response.text)