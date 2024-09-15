import json
import requests


headers = {
    'Content-Type': 'application/json',
}

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
    def __init__(self, key):
        """hi."""
        # Create the model
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
        self.data = data
        self.data["contents"] = [
            {
              "role": "user",
              "parts": [{"text": "Given leftovers ingredients create in detail a good recipe to cook in JSON format. Include item names and quantities for the recipe."}],
            },
            {
              "role": "model",
              "parts": [{"text": 
                "```json\n{\n  \"name\": \"Leftover Fiesta Salad\",\n  \"description\": \"A vibrant and flavorful salad using up your leftovers. Customize it with your favorite ingredients!\",\n  \"ingredients\": [\n    {\n      \"name\": \"Leftover roasted vegetables\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Any roasted vegetables will work: broccoli, carrots, peppers, zucchini, etc.\"\n    },\n    {\n      \"name\": \"Leftover cooked chicken or tofu\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Shredded or diced\"\n    },\n    {\n      \"name\": \"Leftover cooked quinoa or rice\",\n      \"quantity\": \"1 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Use any leftover grains you have\"\n    },\n    {\n      \"name\": \"Black beans\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or cooked from dry\"\n    },\n    {\n      \"name\": \"Corn\",\n      \"quantity\": \"1/2 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Canned or frozen\"\n    },\n    {\n      \"name\": \"Red onion\",\n      \"quantity\": \"1/4\",\n      \"unit\": \"cup\",\n      \"notes\": \"Finely chopped\"\n    },\n    {\n      \"name\": \"Cilantro\",\n      \"quantity\": \"1/4 cup\",\n      \"unit\": \"cup\",\n      \"notes\": \"Chopped\"\n    },\n    {\n      \"name\": \"Lime juice\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Olive oil\",\n      \"quantity\": \"2 tbsp\",\n      \"unit\": \"tablespoon\"\n    },\n    {\n      \"name\": \"Salt\",\n      \"quantity\": \"To taste\"\n    },\n    {\n      \"name\": \"Pepper\",\n      \"quantity\": \"To taste\"\n    }\n  ],\n  \"instructions\": [\n    {\n      \"step\": \"In a large bowl, combine all ingredients.\",\n      \"notes\": \"Feel free to adjust quantities based on your preferences.\"\n    },\n    {\n      \"step\": \"Toss to coat everything in the dressing.\"\n    },\n    {\n      \"step\": \"Taste and adjust seasoning as needed.\"\n    },\n    {\n      \"step\": \"Serve immediately or chill for later.\"\n    }\n  ]\n}\n```\n",
            }],
            },
          ]
        

    def ask(self, question):
        """Send a question."""
        self._data = self.data
        self._data["contents"].append(
            {
                "role": "user",
                "parts": [{"text": question}]
            }
        )
        try:
            print("reqqq", question)
            res = requests.post(self.url, headers=headers, data=json.dumps(self._data))
            if not res.status_code == 200:
                return f"Error: f{res.text}"
            print(res)
            res = res.text.replace("```json", "").replace("```", "")
            res = json.loads(res)
            ans = res['candidates'][0]["content"]["parts"][0]["text"]
            return ans
        except Exception as e:
            return e
