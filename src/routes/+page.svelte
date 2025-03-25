<script lang="ts">
    import MarkdownIt from "markdown-it";

    let response = "";
    let chat = "";
    let isTyping = false;
    const md = new MarkdownIt();

    const onSubmit = async () => {
        if (!chat.trim()) return;

        isTyping = true;
        response = "";

        const req = await fetch("http://localhost:5173/api", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat }) 
        });
        const res2 = await req.json();

        response = res2.message?.content || "";
        isTyping = false;
        chat = ""; // Clear input after sending
    };
</script>

<style>
    :global(body) {
        background: linear-gradient(45deg, #00a86b, #009150, #007a3d);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        font-family: 'Poppins', sans-serif;
        padding: 20px;
    }

    .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 600px;
    }

    .response {
        width: 100%;
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        font-size: 18px;
        max-height: 600px;
        color: #222;
        text-align: left;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
    }

    .loading {
        font-size: 18px;
        color: #d4ffb3;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .input-box {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 40px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        padding: 14px;
        width: 600px;
        max-height: 600px;
        position: fixed;
        bottom: 20px;
        backdrop-filter: blur(10px);
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        padding: 14px;
        font-size: 18px;
        border-radius: 30px;
        color: #222;
        background: transparent;
    }

    button {
        background-color: #00a86b;
        border: none;
        padding: 14px 20px;
        border-radius: 40px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
    }

    button:hover {
        background-color: #007a3d;
        transform: scale(1.05);
    }
</style>

<div class="chat-container">
    {#if response}
        <div class="response">{@html md.render(response.replace(/^[\s\S]*<\/think>(?![\s\S]*<\/think>)/g, ""))}</div>
    {/if}
    
    {#if isTyping}
        <p class="loading">Typing...</p>
    {/if}

    <div class="input-box">
        <input type="text" bind:value={chat} placeholder="Message me" on:keypress={(e) => e.key === 'Enter' && onSubmit()} />
        <button on:click={onSubmit}>Send</button>
    </div>
</div>