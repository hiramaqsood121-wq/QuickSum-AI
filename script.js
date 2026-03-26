// Aapki Groq API Key
const API_KEY = "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";

const sumBtn = document.getElementById('sumBtn');
const inputText = document.getElementById('inputText');
const resultContainer = document.getElementById('resultContainer');
const outputText = document.getElementById('outputText');

sumBtn.addEventListener('click', async () => {
    const textToProcess = inputText.value;

    if (!textToProcess) {
        alert("Please paste some text first!");
        return;
    }

    sumBtn.innerText = "Processing with 2026 Data...";
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
                        content: `Today's date is Thursday, March 26, 2026. 
                        You are a highly accurate AI Assistant. 
                        Rules:
                        1. If the user asks a question, provide a direct and factual answer based on the year 2026.
                        2. As of March 2026, the President of Pakistan is Asif Ali Zardari.
                        3. If the user provides a long text, summarize it into 3 clear and distinct bullet points.
                        4. Do not mix information between points.
                        5. Do not say 'I don't have real-time info' because you are being updated with this prompt.`
                    },
                    {
                        role: "user",
                        content: textToProcess
                    }
                ],
                temperature: 0.1 // Is se AI bilkul seedha aur sachha jawab deta hai, bhatakta nahi.
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const aiResponse = data.choices[0].message.content;

        outputText.innerText = aiResponse;
        resultContainer.classList.remove('hidden');

    } catch (error) {
        console.error("Error:", error);
        alert("Connection error! Please check your internet or API key.");
    } finally {
        sumBtn.innerText = "Summarize Text";
        sumBtn.disabled = false;
    }
});
