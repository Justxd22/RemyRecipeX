"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai

key = os.getenv("GEMINI_API_KEY")
if not key:
    print("ERROR GEMENI KEY MISSIN")
genai.configure(api_key=key)
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

class GEmeni:
    def __init__(self):
        """hi."""
        # Create the model
        self.model = genai.GenerativeModel(
          model_name="gemini-1.5-flash",
          generation_config=generation_config,
          # safety_settings = Adjust safety settings
          # See https://ai.google.dev/gemini-api/docs/safety-settings
        )

        self.chat_session = self.model.start_chat(
          history=[
            {
              "role": "user",
              "parts": [
                "Given leftovers ingredients create in detail a good recipe to cook in JSON format. Include item names and quantities for the recipe.",
              ],
            },
            {
              "role": "model",
              "parts": [
                "```json\n{\n  \"name\": \"Leftover Fiesta Salad\",\n  \"description\": \"A vibrant and flavorful salad using up your leftovers. Customize it with your favorite ingredients!\",\n  \"ingredients\": [\n    {\n      \"name\": \"Leftover roasted vegetables\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc.\"\n    },\n    {\n      \"name\": \"Leftover cooked chicken or tofu\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Shredded or diced\"\n    },\n    {\n      \"name\": \"Leftover cooked quinoa or rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Use any leftover grains you have\"\n    },\n    {\n      \"name\": \"Black beans\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or cooked from dry\"\n    },\n    {\n      \"name\": \"Corn\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or frozen\"\n    },\n    {\n      \"name\": \"Red onion\",\n      \"quantity\": \"1/4\",\n      \"unit\": \"cup\",\n      \"notes\": \"Finely chopped\"\n    },\n    {\n      \"name\": \"Cilantro\",\n      \"quantity\": \"1/4 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Chopped\"\n    },\n    {\n      \"name\": \"Lime juice\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Olive oil\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a large bowl, combine all ingredients.\",\n      \"notes\": \"Feel free to adjust quantities based on your preferences.\"\n    },\n    {\n      \"step\": \"Toss to coat everything in the dressing.\"\n    },\n    {\n      \"step\": \"Taste and adjust seasoning as needed.\"\n    },\n    {\n      \"step\": \"Serve immediately or chill for later.\"\n    }\n  ]\n}\n```\n",
              ],
            },
          ]
        )

# response = chat_session.send_message("tomato, rice, green salad, cheese, cooked chicken, corn")

# print(response.text)
