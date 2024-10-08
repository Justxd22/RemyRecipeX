"""
gemi.py

This module defines the GEmeni class, which interacts with the Gemini API to generate recipes based on user-provided
ingredients or recipe topics. It sends requests to the API and processes the responses to return detailed recipes
in JSON format.

Classes:
    GEmeni: A class to interact with the Gemini API for generating recipes.

Functions:
    __init__(self, key): Initializes the GEmeni class with the API key and predefined prompt data.
    ask(self, question, qtype=1): Sends a question to Gemini and returns a recipe in JSON format.
"""

import json
import requests

# Headers for the API requests
headers = {
    'Content-Type': 'application/json',
}

# Default data template for API requests
data = {
    "contents": [],
    "generationConfig": {
        "temperature": 1,
        "topK": 64,
        "topP": 0.95,
        "maxOutputTokens": 8192,
        "responseMimeType": "text/plain"
    }
}

class GEmeni:
    """
    A class to interact with the Gemini API for generating recipes.

    Attributes:
        url (str): The API endpoint for Gemini.
        data1 (dict): The prompt data for generating recipes based on leftover ingredients.
        data2 (dict): The prompt data for generating recipes based on a given name or topic.
    """

    def __init__(self, key):
        """
        Initialize the GEmeni class with the API key and predefined prompt data.

        Args:
            key (str): The API key for accessing the Gemini service.
        """
        # API endpoint for Gemini
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
        
        # Set up prompt data to generate the recipe based on the ingredients
        self.data1 = data
        self.data1["contents"] = [
            {
              "role": "user",
              "parts": [{"text": "Given leftovers ingredients create in details a good recipe to cook in JSON format. Include item names and quantities for the recipe, if asked for anything else please answer with 'Please provide me with your leftovers so i can help you make a food recipe to reduce food waste.' you have to strictly reply to that in case the question is out of cooking context, be creative like a professional chief, your name is Remy, always stick to the Json format for outputting."}],
            },
            {
              "role": "model",
              "parts": [{"text": 
                "```json\n{\n  \"name\": \"Leftover Fiesta Salad\",\n  \"description\": \"A vibrant and flavorful salad using up your leftovers. Customize it with your favorite ingredients!\",\n  \"ingredients\": [\n    {\n      \"name\": \"Leftover roasted vegetables\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc.\"\n    },\n    {\n      \"name\": \"Leftover cooked chicken or tofu\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Shredded or diced\"\n    },\n    {\n      \"name\": \"Leftover cooked quinoa or rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Use any leftover grains you have\"\n    },\n    {\n      \"name\": \"Black beans\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or cooked from dry\"\n    },\n    {\n      \"name\": \"Corn\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or frozen\"\n    },\n    {\n      \"name\": \"Red onion\",\n      \"quantity\": \"1/4\",\n      \"unit\": \"cup\",\n      \"notes\": \"Finely chopped\"\n    },\n    {\n      \"name\": \"Cilantro\",\n      \"quantity\": \"1/4 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Chopped\"\n    },\n    {\n      \"name\": \"Lime juice\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Olive oil\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a large bowl, combine all ingredients.\",\n      \"notes\": \"Feel free to adjust quantities based on your preferences.\"\n    },\n    {\n      \"step\": \"Toss to coat everything in the dressing.\"\n    },\n    {\n      \"step\": \"Taste and adjust seasoning as needed.\"\n    },\n    {\n      \"step\": \"Serve immediately or chill for later.\"\n    }\n  ]\n}\n```\n",
            }],
            },
          ]
        
        # Set up prompt data to generate the recipe based on the topic or name
        self.data2 = data
        self.data2["contents"] = [
            {
              "role": "user",
              "parts": [{"text": "Given a recipe topic or name create in detail a good recipe to cook in JSON format. Include item names and quantities for the recipe, if asked for anything else please answer with 'Please provide me with your leftovers so i can help you make a food recipe to reduce food waste.' you have to strictly reply to that in case the question is out of cooking context, be creative like a professional chief, your name is Remy, always stick to the Json format for outputting."}],
            },
            {
              "role": "model",
              "parts": [{"text": 
                "```json\n{\n  \"name\": \"Fiesta Salad\",\n  \"description\": \"A vibrant and flavorful salad. Customize it with your favorite ingredients!\",\n  \"ingredients\": [\n    {\n      \"name\": \"Leftover roasted vegetables\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc.\"\n    },\n    {\n      \"name\": \"Leftover cooked chicken or tofu\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Shredded or diced\"\n    },\n    {\n      \"name\": \"Leftover cooked quinoa or rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Use any leftover grains you have\"\n    },\n    {\n      \"name\": \"Black beans\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or cooked from dry\"\n    },\n    {\n      \"name\": \"Corn\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or frozen\"\n    },\n    {\n      \"name\": \"Red onion\",\n      \"quantity\": \"1/4\",\n      \"unit\": \"cup\",\n      \"notes\": \"Finely chopped\"\n    },\n    {\n      \"name\": \"Cilantro\",\n      \"quantity\": \"1/4 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Chopped\"\n    },\n    {\n      \"name\": \"Lime juice\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Olive oil\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a large bowl, combine all ingredients.\",\n      \"notes\": \"Feel free to adjust quantities based on your preferences.\"\n    },\n    {\n      \"step\": \"Toss to coat everything in the dressing.\"\n    },\n    {\n      \"step\": \"Taste and adjust seasoning as needed.\"\n    },\n    {\n      \"step\": \"Serve immediately or chill for later.\"\n    }\n  ]\n}\n```\n",
            }],
            },
          ]
        

    def ask(self, question, qtype=1):
        """
        Send a question to Gemini and return a recipe in JSON format.
        
        Args:
            question (str): The question or recipe request from the user.
            qtype (int):
                1 for asking based on leftover ingredients,
                2 for a recipe based on a given name or topic.
        
        Returns:
            tuple: The generated recipe in JSON format and a status code (200 for success, 500 for error).
        """
        
        self._data = self.data1 if qtype == 1 else self.data2
        rules = "create in detail a good recipe to cook in JSON format. Include item names and quantities for the recipe, if asked for anything else please answer with 'Please provide me with your leftovers so i can help you make a food recipe to reduce food waste.' you have to strictly reply to that in case the question is out of cooking context, be creative like a professional chief, your name is Remy, always stick to the Json format for outputting even when user is out of context. Question: "
        if qtype == 2: rules = "Given a recipe topic or name, be creative, add things to make it more delicious, " + rules
        else: rules = "Given leftovers ingredients, " + rules
        # Append the user's question to the prompt
        self._data["contents"].append(
            {
                "role": "user",
                "parts": [{"text": rules + question}]
            }
        )
        try:
            print("reqqq: ", question)
            # Send a POST request to the generative language API
            res = requests.post(self.url, headers=headers, data=json.dumps(self._data))
            if not res.status_code == 200:
                return str(f"Error: f{res.text}"), 500
            print(res)
            
            # Process the response and return the generated recipe
            res = res.text.replace("```json", "").replace("```", "")
            res = json.loads(res)
            ans = res['candidates'][0]["content"]["parts"][0]["text"]
            return ans, 200
        except Exception as e:
            return str(e), 500
