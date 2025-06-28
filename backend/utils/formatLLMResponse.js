export function formatLLMResponse(rawText) {
  const lines = rawText.split("\n").filter(Boolean);
  const elements = [];

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("### ")) {
      elements.push(
        <h3 className="text-lg font-semibold mt-4">{line.slice(4)}</h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 className="text-xl font-bold mt-6">{line.slice(3)}</h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 className="text-2xl font-bold mt-6">{line.slice(2)}</h1>
      );
    } else if (line.startsWith("- ")) {
      const last = elements[elements.length - 1];
      const listItem = <li>{line.slice(2)}</li>;

      if (last && last.type === "ul") {
        last.props.children.push(listItem);
      } else {
        elements.push(<ul className="list-disc ml-5">{[listItem]}</ul>);
      }
    } else if (line.startsWith("* ")) {
      const last = elements[elements.length - 1];
      const listItem = <li>{line.slice(2)}</li>;

      if (last && last.type === "ul") {
        last.props.children.push(listItem);
      } else {
        elements.push(<ul className="list-disc ml-5">{[listItem]}</ul>);
      }
    } else if (line.startsWith("---")) {
      elements.push(<hr className="my-4 border-t border-gray-300" />);
    } else {
      elements.push(<p className="mt-2 text-sm leading-relaxed">{line}</p>);
    }
  }

  return elements;
}
