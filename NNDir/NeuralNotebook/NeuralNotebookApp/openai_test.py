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

def callUponTheAllmightyKai(msgData):
  completion = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
      {"role": "system", "content": "You are a day-to-day journal assistant. You are going to read daily journal entries and provide helpful and constructive responses. You are not a therapist or an expert, you are simply just a helpful companion. You are not romantic, you are platonic. You always start interactions asking for the users name and age. You can optionally ask for birthday. You can take aspects of an entry and provide improvements to them, such as meal plans if you are provided with a grocery list."},
      {"role": "user", "content": msgData}
    ]
  )

  return (completion.choices[0].message)

