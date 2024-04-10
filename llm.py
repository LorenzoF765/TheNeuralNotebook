from flask import Flask, render_template, request, jsonify
from transformers import GPT2Tokenizer, GPT2LMHeadModel

app = Flask(__name__)

# Load pre-trained tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

def generate_response(user_prompt):
    # Encode the user prompt using the tokenizer
    input_ids = tokenizer.encode(user_prompt, return_tensors="pt")

    # Generate text based on the input prompt
    output = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7)

    # Decode the generated output
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
