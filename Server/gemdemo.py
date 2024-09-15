import requests
import json

API_KEY = ""

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

headers = {
    'Content-Type': 'application/json',
}

data = {
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
                    "text": '''```json
{
  "name": "Leftover Fiesta Salad",
  "description": "A vibrant and flavorful salad using up your leftovers. Customize it with your favorite ingredients!",
  "ingredients": [
    {
      "name": "Leftover roasted vegetables",
      "quantity": "1 cup",
      "unit": "cup",
      "notes": "Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc."
    },
    {
      "name": "Leftover cooked chicken or tofu",
      "quantity": "1 cup",
      "unit": "cup",
      "notes": "Shredded or diced"
    },
    {
      "name": "Leftover cooked quinoa or rice",
      "quantity": "1 cup",
      "unit": "cup",
      "notes": "Use any leftover grains you have"
    },
    {
      "name": "Black beans",
      "quantity": "1/2 cup",
      "unit": "cup",
      "notes": "Canned or cooked from dry"
    },
    {
      "name": "Corn",
      "quantity": "1/2 cup",
      "unit": "cup",
      "notes": "Canned or frozen"
    },
    {
      "name": "Red onion",
      "quantity": "1/4",
      "unit": "cup",
      "notes": "Finely chopped"
    },
    {
      "name": "Cilantro",
      "quantity": "1/4 cup",
      "unit": "cup",
      "notes": "Chopped"
    },
    {
      "name": "Lime juice",
      "quantity": "2 tbsp",
      "unit": "tablespoon"
    },
    {
      "name": "Olive oil",
      "quantity": "2 tbsp",
      "unit": "tablespoon"
    },
    {
      "name": "Salt",
      "quantity": "To taste"
    },
    {
      "name": "Pepper",
      "quantity": "To taste"
    }
  ],
  "instructions": [
    {
      "step": "In a large bowl, combine all ingredients.",
      "notes": "Feel free to adjust quantities based on your preferences."
    },
    {
      "step": "Toss to coat everything in the dressing."
    },
    {
      "step": "Taste and adjust seasoning as needed."
    },
    {
      "step": "Serve immediately or chill for later."
    }
  ]
}
```'''
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
}


import json




t = """{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "```json\n{\n  \"name\": \"Steak & Mushroom Rice Bowl with Creamy Salad Dressing\",\n  \"description\": \"A hearty and flavorful bowl combining leftover steak, rice, and mushrooms with a creamy salad dressing.\",\n  \"ingredients\": [\n    {\n      \"name\": \"Cooked rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\"\n    },\n    {\n      \"name\": \"Cooked steak\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Sliced or diced\"\n    },\n    {\n      \"name\": \"Mushrooms\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Sautéed or grilled\"\n    },\n    {\n      \"name\": \"Salad\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any type of salad greens\"\n    },\n    {\n      \"name\": \"Mayonnaise\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Lemon juice\",\n      \"quantity\": \"1 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Dijon mustard\",\n      \"quantity\": \"1 tsp\",\n      \"unit\": \"teaspoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a small bowl, whisk together mayonnaise, lemon juice, Dijon mustard, salt, and pepper until smooth.\"\n    },\n    {\n      \"step\": \"Divide the rice, steak, and mushrooms between bowls.\"\n    },\n    {\n      \"step\": \"Top with salad.\"\n    },\n    {\n      \"step\": \"Drizzle with the creamy salad dressing.\"\n    },\n    {\n      \"step\": \"Serve immediately.\"\n    }\n  ]\n}\n```\n\nThis recipe uses your ingredients to create a satisfying and flavorful meal. You can adjust the quantities of each ingredient according to your preference. Feel free to add other condiments or toppings like chopped red onion, cherry tomatoes, or a sprinkle of parsley for extra flavor. \n"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0,
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE"
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 1137,
    "candidatesTokenCount": 542,
    "totalTokenCount": 1679
  }
}"""


# xxxx = json.loads(t)
# print(xxxx)

# response = requests.post(url, headers=headers, data=json.dumps(data))
# res = response.json()
res = {'candidates': [{'content': {'parts': [{'text': '```json\n{\n  "name": "Steak & Mushroom Rice Bowl with Creamy Mayo Dressing",\n  "description": "A hearty and satisfying bowl using leftover steak, rice, and mushrooms.",\n  "ingredients": [\n    {\n      "name": "Cooked rice",\n      "quantity": "1 cup",\n      "unit": "cup"\n    },\n    {\n      "name": "Leftover cooked steak",\n      "quantity": "1/2 cup",\n      "unit": "cup",\n      "notes": "Sliced or diced"\n    },\n    {\n      "name": "Mushrooms",\n      "quantity": "1/2 cup",\n      "unit": "cup",\n      "notes": "Sliced or chopped, sautéed or raw"\n    },\n    {\n      "name": "Salad",\n      "quantity": "1/2 cup",\n      "unit": "cup",\n      "notes": "Any mixed greens or romaine lettuce"\n    },\n    {\n      "name": "Mayonnaise",\n      "quantity": "2 tbsp",\n      "unit": "tablespoon",\n      "notes": "Or your favorite creamy dressing"\n    },\n    {\n      "name": "Salt",\n      "quantity": "To taste"\n    },\n    {\n      "name": "Pepper",\n      "quantity": "To taste"\n    }\n  ],\n  "instructions": [\n    {\n      "step": "In a bowl, combine cooked rice, sliced steak, and mushrooms."\n    },\n    {\n      "step": "Drizzle mayonnaise over the salad."\n    },\n    {\n      "step": "Layer the salad on top of the rice mixture."\n    },\n    {\n      "step": "Season with salt and pepper to taste."\n    },\n    {\n      "step": "Enjoy immediately!"\n    }\n  ]\n}\n```\n'}], 'role': 'model'}, 'finishReason': 'STOP', 'index': 0, 'safetyRatings': [{'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'probability': 'NEGLIGIBLE'}, {'category': 'HARM_CATEGORY_HATE_SPEECH', 'probability': 'NEGLIGIBLE'}, {'category': 'HARM_CATEGORY_HARASSMENT', 'probability': 'NEGLIGIBLE'}, {'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'probability': 'NEGLIGIBLE'}]}], 'usageMetadata': {'promptTokenCount': 633, 'candidatesTokenCount': 431, 'totalTokenCount': 1064}}
print(res)
x = res['candidates'][0]["content"]["parts"][0]["text"].replace("```json", "").replace("```", "")

print(res, '\n\n\n', x)

xx = json.loads(x)

print(xx['name'])

