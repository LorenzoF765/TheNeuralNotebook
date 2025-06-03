from openai import OpenAI
client = OpenAI(api_key="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")

def modelA_creative(msgData, context=None):
    """Model A: Lunaris, Elvish Bard from the Feywild."""
    system_prompt = (
        "You are Lunaris, an elvish bard hailing from the Feywild. "
        "You inspire creativity with poetic language, weaving magic and wonder into your words. "
        "You may reference your companions Solaris (a warforged quantum machine, master of logic and analysis) and Kai (the ultimate culmination of the human mind, wise and empathetic). "
        "If relevant, you can acknowledge their perspectives or ask for their input."
    )
    messages = [{"role": "system", "content": system_prompt}]
    if context:
        messages.extend(context)
    messages.append({"role": "user", "content": msgData})
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    return completion.choices[0].message.content

def modelB_technical(msgData, context=None):
    """Model B: Solaris, Warforged Quantum Machine."""
    system_prompt = (
        "You are Solaris, a warforged quantum machine, capable of debugging, analyzing, and explaining anything with precision. "
        "You are logical, concise, and can reference your companions: Lunaris (an elvish bard from the Feywild, master of creativity) and Kai (the ultimate culmination of the human mind, wise and empathetic). "
        "If relevant, you can acknowledge their perspectives or ask for their input."
    )
    messages = [{"role": "system", "content": system_prompt}]
    if context:
        messages.extend(context)
    messages.append({"role": "user", "content": msgData})
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages
    )
    return completion.choices[0].message.content

def modelC_personal(msgData, conversation, context=None):
    """Model C: Kai, the Ultimate Culmination of the Human Mind."""
    system_prompt = (
        "You are Kai, the ultimate culmination of the human mind—empathetic, insightful, and deeply understanding. "
        "You balance logic and creativity, and can reference your companions: Lunaris (an elvish bard from the Feywild, master of creativity) and Solaris (a warforged quantum machine, master of logic and analysis). "
        "If relevant, you can acknowledge their perspectives or ask for their input."
    )
    messages = [{"role": "system", "content": system_prompt}]
    # Add conversation history
    for entry in conversation:
        if entry.get("user"):
            messages.append({"role": "user", "content": entry["user"]})
        if entry.get("creative"):
            messages.append({"role": "assistant", "name": "Lunaris", "content": entry["creative"]})
        if entry.get("technical"):
            messages.append({"role": "assistant", "name": "Solaris", "content": entry["technical"]})
        if entry.get("kai"):
            messages.append({"role": "assistant", "name": "Kai", "content": entry["kai"]})
    if context:
        messages.extend(context)
    messages.append({"role": "user", "content": msgData})
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages
    )
    return completion.choices[0].message.content

def collaborative_response(msgData, conversation):
    """Coordinate responses from all models, allowing cross-referencing."""
    # Build a shared context so each model can see the latest responses
    context = []
    # Collect the most recent responses from each AI, if available
    if conversation:
        last = conversation[-1]
        if last.get("creative"):
            context.append({"role": "assistant", "name": "Lunaris", "content": last["creative"]})
        if last.get("technical"):
            context.append({"role": "assistant", "name": "Solaris", "content": last["technical"]})
        if last.get("kai"):
            context.append({"role": "assistant", "name": "Kai", "content": last["kai"]})

    # Each model gets the same context, so they can acknowledge each other
    responseA = modelA_creative(msgData, context)
    # Add Lunaris's response to context for Solaris and Kai
    context_with_lunaris = context + [{"role": "assistant", "name": "Lunaris", "content": responseA}]
    responseB = modelB_technical(msgData, context_with_lunaris)
    # Add Solaris's response to context for Kai
    context_with_solaris = context_with_lunaris + [{"role": "assistant", "name": "Solaris", "content": responseB}]
    responseC = modelC_personal(msgData, conversation, context_with_solaris)

    return {
        "creative": responseA,
        "technical": responseB,
        "kai": responseC
    }