// Aapki Groq API Key yahan add kar di gayi hai
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

    // Button ko "Processing" mode mein dalna
    sumBtn.innerText = "Summarizing...";
    sumBtn.disabled = true;

    try {
        // Groq API ko call karne ka tareeqa
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Yeh Groq ka fast model hai
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that summarizes text into 3 clear bullet points."
                    },
                    {
                        role: "user",
                        content: `Please summarize this: ${textToProcess}`
                    }
                ]
            })
        });

        const data = await response.json();
        
        // Agar koi error aaye to console mein dikhaye
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Summary extract karna
        const summary = data.choices[0].message.content;

        // Screen par summary dikhana
        outputText.innerText = summary;
        resultContainer.classList.remove('hidden');

    } catch (error) {
        console.error("Error:", error);
        alert("Oops! Something went wrong: " + error.message);
    } finally {
        // Button ko wapis normal karna
        sumBtn.innerText = "Summarize Text";
        sumBtn.disabled = false;
    }
});