async function translateText() {
    const text = document.getElementById("input-text").value;
    const from = document.getElementById("from-lang").value;
    const to = document.getElementById("to-lang").value;
    const isContextual = document.getElementById("context-mode").checked;
  
    if (!text.trim()) return alert("Escreve algo para traduzir!");
  
    const endpoint = "https://libretranslate.com/translate";
  
    const body = {
      q: text,
      source: from,
      target: to,
      format: "text",
    };
  
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
  
      const data = await res.json();
      let result = data.translatedText;
  
      // Simulação básica de contextualização
      if (isContextual) {
        result = contextualize(result, to);
      }
  
      document.getElementById("output-text").value = result;
    } catch (err) {
      alert("Erro na tradução.");
      console.error(err);
    }
  }
  
  function contextualize(text, lang) {
    // Simples substituições idiomáticas por exemplo
    if (lang === "en") {
      return text
        .replace(/kick the bucket/g, "die")
        .replace(/break a leg/g, "good luck");
    }
    return text;
  }
  