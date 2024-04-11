from flask import Flask, render_template, request, jsonify
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
app = Flask(__name__)

# Load pre-trained tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("deepset/roberta-base-squad2")
model = AutoModelForQuestionAnswering.from_pretrained("deepset/roberta-base-squad2")

# Define the function to generate AI response
def generate_response(user_prompt):
    # Tokenize the user prompt
    input_ids = tokenizer.encode(user_prompt, return_tensors="pt")
    
    # Generate a response from the model
    output = model.generate(
        input_ids,
        max_length=100,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        temperature=0.7
    )
    
    # Decode and return the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    # Check if request has JSON data
    if request.is_json:
        user_data = request.get_json()
        user_prompt = user_data.get("prompt", "")
        # Generate AI response based on user prompt using the model
        ai_response = generate_response(user_prompt)
        return jsonify(ai_response)
    else:
        return jsonify({"error": "Request data is not in JSON format"}), 400

if __name__ == "__main__":
    app.run(debug=True)
