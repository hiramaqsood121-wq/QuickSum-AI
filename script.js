async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value.trim();

  if (userText === "") return;

  // Show user message
  chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant. Always give correct, short and clear answers. If you don't know, say I don't know."
          },
          {
            role: "user",
            content: userText
          }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();

    const botReply = data.choices[0].message.content;

    chatBox.innerHTML += `<p><b>AI:</b> ${botReply}</p>`;
  } catch (error) {
    chatBox.innerHTML += `<p><b>AI:</b> Error aa gaya, dubara try karo.</p>`;
    console.error(error);
  }
}
