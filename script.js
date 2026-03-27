async function askAI() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const question = input.value.trim();
  if (!question) return;

  chat.innerHTML += `<div class="msg user"><b>You:</b> ${question}</div>`;
  input.value = "";

  try {
    // URL ko "/api/chat" rakhein (Vercel automatic api folder dhoond lega)
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await res.json();

    if (data.reply) {
        chat.innerHTML += `<div class="msg ai"><b>AI:</b> ${data.reply}</div>`;
    } else {
        chat.innerHTML += `<div style="color:red;">Error: No reply from AI</div>`;
    }
    
    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    chat.innerHTML += `<div style="color:red;">Error fetching response</div>`;
  }
}
