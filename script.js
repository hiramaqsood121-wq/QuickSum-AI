const API_KEY = "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";

const sumBtn = document.getElementById('sumBtn');
const inputText = document.getElementById('inputText');
const resultContainer = document.getElementById('resultContainer');
const outputText = document.getElementById('outputText');
const welcomeText = document.querySelector('.welcome-msg');

let userName = "";

// Tool load hotay hi naam poochen
window.onload = () => {
    userName = prompt("Welcome to your Personal AI. May I have your name?", "Guest");
    if (!userName) userName = "Guest";
    welcomeText.innerText = `Good evening, ${userName}. How can I assist you today?`;
};

sumBtn.addEventListener('click', async () => {
    const query = inputText.value;
    if (!query) return;

    sumBtn.innerText = "CONSULTING AI...";
    sumBtn.disabled = true;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Today is Thursday, March 26, 2026. 
                        You are a sophisticated, polite personal assistant for ${userName}.
                        Style: Professional, concise, and elegant.
                        Knowledge: 
                        - Current President of Pakistan in 2026 is Asif Ali Zardari.
                        - Always provide direct answers for 2026 queries.
                        - Address the user as ${userName} if appropriate.`
                    },
                    { role: "user", content: query }
                ],
                temperature: 0.2
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        outputText.innerText = aiResponse;
        resultContainer.classList.remove('hidden');

    } catch (error) {
        alert("An error occurred. Please try again.");
    } finally {
        sumBtn.innerText = "ASK ASSISTANT";
        sumBtn.disabled = false;
    }
});
