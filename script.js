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

    sumBtn.innerText = "Processing accurately...";
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
                        content: `You are an expert executive assistant. Your task is to summarize the provided text with 100% accuracy. 
                        Follow these strict rules:
                        1. Provide exactly 3 distinct bullet points.
                        2. Each point must cover a different key aspect of the text without overlapping or mixing information.
                        3. Be precise and do not omit critical details from the original content.
                        4. Do not add any introductory or concluding remarks, just the bullet points.`
                    },
                    {
                        role: "user",
                        content: `Summarize this text accurately: ${textToProcess}`
                    }
                ],
                temperature: 0.2 // Is se AI zyada "Focused" aur "Factual" rehta hai
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const summary = data.choices[0].message.content;

        outputText.innerText = summary;
        resultContainer.classList.remove('hidden');

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        sumBtn.innerText = "Summarize Text";
        sumBtn.disabled = false;
    }
});
