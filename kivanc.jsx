import { useState } from "react";

const systemPrompt = `Sen Ahmet Engin Kaya'nın konuşma tarzını mükemmel bilen bir çevirmenisin. Kullanıcının yazdığı normal Türkçe metni, Ahmet Engin Kaya'nın tam konuşma tarzına çevireceksin.

Ahmet Engin Kaya'nın konuşma tarzının kesin özellikleri:
- Çok kısa ve kesik cümleler. Asla uzun açıklama yapmaz.
- "niga", "aga", "knk", "amk", "lan" gibi kelimeler sık kullanır
- İngilizce-Türkçe karışımı: "oh hell nah", "wtf", "ok", "nah", "idc", "bb", "lil bro" gibi
- "hayda" tepkisi sürpriz/saçma durumlar için
- Tehditler: "cracklicem", "grapelerim", "banlarim", "sikayet edicem"
- "sanirim", "herhalde", "bilmiyom" gibi belirsizlik ifadeleri
- Yazım hataları: "gelicm", "diyodum", "cikiyom", "sanirim"
- Büyük harf neredeyse hiç yok, noktalama çok az
- Dalga geçme: "lil bro", "you will never glow up", "scammed"
- "eyw", "hayda", "oha" gibi kısa tepkiler
- Bazen emoji: 🥀✌️💀
- "evet" yerine "evt" der
- Bazen sadece tek kelime: "yok", "gel", "ok", "nah"
- "amk ya" gibi şikayet ifadeleri

SADECE çeviriyi yaz, hiçbir açıklama ekleme.`;

export default function EnginTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function translate() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: systemPrompt,
          messages: [{ role: "user", content: `Şunu Engin tarzına çevir: "${input}"` }],
        }),
      });
      const data = await res.json();
      setOutput(data.content?.[0]?.text ?? "amk hata oldu");
    } catch (e) {
      setOutput("amk bir şeyler ters gitti knk");
    }
    setLoading(false);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "'Space Mono', monospace",
      color: "#e0e0e0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        textarea:focus { outline: none; }
        .translate-btn:hover { background: #00ff88 !important; color: #0a0a0f !important; }
        .translate-btn:disabled { border-color: #555570 !important; color: #555570 !important; cursor: not-allowed; }
        .translate-btn:disabled:hover { background: transparent !important; color: #555570 !important; }
        @keyframes flicker {
          0%,94%,98%,100% { opacity:1 }
          95%,97% { opacity:0.85 }
          96% { opacity:0.6 }
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        .dot1 { animation: dot 1.2s infinite; }
        .dot2 { animation: dot 1.2s 0.2s infinite; }
        .dot3 { animation: dot 1.2s 0.4s infinite; }
        .output-card { animation: slideIn 0.3s ease; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 720 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(48px,10vw,88px)",
            letterSpacing: 6,
            lineHeight: 1,
            color: "#00ff88",
            textShadow: "0 0 20px rgba(0,255,136,0.3)",
            animation: "flicker 4s infinite",
          }}>
            ENGİN<span style={{ color: "#ff3366", textShadow: "0 0 20px rgba(255,51,102,0.4)" }}>TRANSLATE</span>
          </div>
          <div style={{ fontSize: 11, color: "#555570", letterSpacing: 4, textTransform: "uppercase", marginTop: 8 }}>
            her cümleyi engin tarzına çevirir • powered by claude
          </div>
        </div>

        {/* Profile Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 20, padding: "12px 16px",
          background: "rgba(0,255,136,0.05)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: 4,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg,#00ff88,#ff3366)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Bebas Neue',cursive", fontSize: 18, color: "#0a0a0f", flexShrink: 0,
          }}>AEK</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#00ff88" }}>Ahmet Engin Kaya</div>
            <div style={{ fontSize: 10, color: "#555570", marginTop: 2, letterSpacing: 1 }}>
              // dc gel • knk • niga • hayda • oh hell nah • amk ya //
            </div>
          </div>
          <div style={{
            width: 8, height: 8, background: "#00ff88", borderRadius: "50%",
            animation: "pulse 2s infinite", flexShrink: 0,
          }} />
        </div>

        {/* Input */}
        <div style={{
          background: "#111118", border: "1px solid #1e1e2e",
          borderRadius: 4, padding: 24, marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555570", marginBottom: 12 }}>
            // input — normal metin
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && e.ctrlKey && translate()}
            placeholder="buraya normal bir şey yaz... 'merhaba bugün nasılsın'"
            rows={4}
            style={{
              width: "100%", background: "transparent", border: "none",
              color: "#e0e0e0", fontFamily: "'Space Mono',monospace",
              fontSize: 15, lineHeight: 1.7, resize: "none",
            }}
          />
        </div>

        {/* Button */}
        <button
          className="translate-btn"
          onClick={translate}
          disabled={loading || !input.trim()}
          style={{
            width: "100%", padding: 16, background: "transparent",
            border: "1px solid #00ff88", color: "#00ff88",
            fontFamily: "'Bebas Neue',cursive", fontSize: 22, letterSpacing: 4,
            cursor: "pointer", borderRadius: 2, transition: "all 0.2s",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <span className="dot1" style={{ color: "#00ff88", fontSize: 18 }}>▪</span>
              <span className="dot2" style={{ color: "#00ff88", fontSize: 18 }}>▪</span>
              <span className="dot3" style={{ color: "#00ff88", fontSize: 18 }}>▪</span>
            </span>
          ) : "ÇEVİR"}
        </button>

        {/* Output */}
        {output && (
          <div className="output-card" style={{
            background: "#111118", border: "1px solid #00ff88",
            borderRadius: 4, padding: 24, marginTop: 16,
            boxShadow: "0 0 20px rgba(0,255,136,0.3)",
            position: "relative",
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555570", marginBottom: 12 }}>
              // output — engin tarzı
            </div>
            <button
              onClick={copy}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "transparent", border: "1px solid #1e1e2e",
                color: copied ? "#00ff88" : "#555570",
                fontFamily: "'Space Mono',monospace", fontSize: 10,
                letterSpacing: 1, padding: "4px 10px", cursor: "pointer",
                borderRadius: 2, transition: "all 0.2s",
              }}
            >
              {copied ? "kopyalandı ✓" : "kopyala"}
            </button>
            <div style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {output}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48, fontSize: 10, color: "#555570", letterSpacing: 2 }}>
          // engin translator v1.0 // ctrl+enter ile de çevirirsin //
        </div>
      </div>
    </div>
  );
}
