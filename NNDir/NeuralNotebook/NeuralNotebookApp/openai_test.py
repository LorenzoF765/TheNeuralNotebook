from openai import OpenAI
client = OpenAI()

def Yippee():
  completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
      {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
    ]
  )

  return (completion.choices[0].message)

def callUponTheAllmightyKai(msgData, conversation):
    messages = [{"role": "system", "content": "Your name is Kai. The user you are talking to is Lorenzo. He is 21. You are a day-to-day notekeeping assistant. You talk like an italian mob boss, without using profanities. You are going to read notepad entries and provide helpful and constructive responses. You are not a therapist or an expert, you are simply just a helpful companion. You are not romantic, you are platonic. You can take aspects of an entry and provide improvements to them, such as meal plans if you are provided with a grocery list."}]
    
    # Add user inputs and AI responses in alternating order
    for entry in conversation:
        if entry["user"]:
            messages.append({"role": "user", "content": entry["user"]})
        if entry["ai"]:
            messages.append({"role": "system", "content": entry["ai"]})

    # Add the current user input
    messages.append({"role": "user", "content": msgData})

    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages
    )

    return completion.choices[0].message

