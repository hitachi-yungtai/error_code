import { useEffect, useState } from "react";

interface RowData {
  code: string;
  content: string;
  model: string;
}

function App() {
  const [data, setData] = useState<RowData[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/1QrALMBdjByS0_nYIlWGcEZpGqFVK2CbjPImtvgWXbUE/gviz/tq?tqx=out:json")
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows.map((r: any) => ({
          code: r.c[0]?.v ?? "",
          content: r.c[1]?.v ?? "",
          model: r.c[2]?.v ?? "",
        }));
        setData(rows);
      });
  }, []);

  const results = data.filter(
    (item) =>
      item.code.toString().includes(keyword) ||
      item.content.includes(keyword) ||
      item.model.includes(keyword)
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>故障碼查詢</h2>

      <input
        style={{ width: "100%", padding: 10, fontSize: 16 }}
        placeholder="輸入故障碼或關鍵字..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div>
        {results.map((item, i) => (
          <div
            key={i}
            style={{
              marginTop: 15,
              padding: 15,
              borderRadius: 8,
              background: "#f5f5f5",
            }}
          >
            <div>
              <b>Code:</b> {item.code}
            </div>
            <div>
              <b>Content:</b> {item.content}
            </div>
            <div>
              <b>Model:</b> {item.model}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;