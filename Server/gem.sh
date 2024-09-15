#!/usr/bin/bash
API_KEY=""

# Adjust safety settings in generationConfig below.
# See https://ai.google.dev/gemini-api/docs/safety-settings
curl \
  -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY} \
  -H 'Content-Type: application/json' \
  -d @<(echo '{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Given leftovers ingredients create in detail a good recipe to cook in JSON format. Include item names and quantities for the recipe."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "```json\n{\n  \"name\": \"Leftover Fiesta Salad\",\n  \"description\": \"A vibrant and flavorful salad using up your leftovers. Customize it with your favorite ingredients!\",\n  \"ingredients\": [\n    {\n      \"name\": \"Leftover roasted vegetables\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc.\"\n    },\n    {\n      \"name\": \"Leftover cooked chicken or tofu\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Shredded or diced\"\n    },\n    {\n      \"name\": \"Leftover cooked quinoa or rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Use any leftover grains you have\"\n    },\n    {\n      \"name\": \"Black beans\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or cooked from dry\"\n    },\n    {\n      \"name\": \"Corn\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or frozen\"\n    },\n    {\n      \"name\": \"Red onion\",\n      \"quantity\": \"1/4\",\n      \"unit\": \"cup\",\n      \"notes\": \"Finely chopped\"\n    },\n    {\n      \"name\": \"Cilantro\",\n      \"quantity\": \"1/4 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Chopped\"\n    },\n    {\n      \"name\": \"Lime juice\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Olive oil\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a large bowl, combine all ingredients.\",\n      \"notes\": \"Feel free to adjust quantities based on your preferences.\"\n    },\n    {\n      \"step\": \"Toss to coat everything in the dressing.\"\n    },\n    {\n      \"step\": \"Taste and adjust seasoning as needed.\"\n    },\n    {\n      \"step\": \"Serve immediately or chill for later.\"\n    }\n  ]\n}\n```\n"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "rice, cooked steak, salad, mayo, mushrooms"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "```json\n{\n  \"name\": \"Steak & Mushroom Rice Bowl with Creamy Salad Dressing\",\n  \"description\": \"A hearty and flavorful bowl combining leftover steak, rice, and mushrooms with a creamy salad dressing.\",\n  \"ingredients\": [\n    {\n      \"name\": \"Cooked rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\"\n    },\n    {\n      \"name\": \"Cooked steak\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Sliced or diced\"\n    },\n    {\n      \"name\": \"Mushrooms\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Sautéed or grilled\"\n    },\n    {\n      \"name\": \"Salad\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any type of salad greens\"\n    },\n    {\n      \"name\": \"Mayonnaise\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Lemon juice\",\n      \"quantity\": \"1 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Dijon mustard\",\n      \"quantity\": \"1 tsp\",\n      \"unit\": \"teaspoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a small bowl, whisk together mayonnaise, lemon juice, Dijon mustard, salt, and pepper until smooth.\"\n    },\n    {\n      \"step\": \"Divide the rice, steak, and mushrooms between bowls.\"\n    },\n    {\n      \"step\": \"Top with salad.\"\n    },\n    {\n      \"step\": \"Drizzle with the creamy salad dressing.\"\n    },\n    {\n      \"step\": \"Serve immediately.\"\n    }\n  ]\n}\n```\n"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "rice, cooked steak, salad, mayo, mushrooms"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 1,
    "topK": 64,
    "topP": 0.95,
    "maxOutputTokens": 8192,
    "responseMimeType": "text/plain"
  }
}')
