import { useState, useMemo } from "react";
import { SourceEditor } from "./SourceEditor";
import { VariableInputsList } from "./VariableInputsList";
import { PreviewPanel } from "./PreviewPanel";
import { CopyButton } from "./CopyButton";

interface VariableInstance {
  /** Unique identifier for this specific variable instance (e.g. UUID) */
  id: string;
  /** Variable name (text between {{ and }}) */
  name: string;
  /** Current value entered by user for this instance */
  value: string;
  /** Original, full tag found in source text (e.g. "{{variable}}") */
  originalTag: string;
  /** Comment text after the variable (e.g. " <- some comment") */
  comment?: string;
}

const usePromptParser = (sourceText: string) => {
  return useMemo(() => {
    // Match {{variable}} followed by optional comment starting with <-
    const regex = /\{\{([^}]+)\}\}(\s*<-[^\n]+)?/g;
    const variables: VariableInstance[] = [];
    let match;

    while ((match = regex.exec(sourceText)) !== null) {
      variables.push({
        id: crypto.randomUUID(),
        name: match[1],
        value: "",
        originalTag: match[0], // Full match including comment
        comment: match[2], // The comment part if exists
      });
    }

    return variables;
  }, [sourceText]);
};

export default function PromptFormatterApp() {
  const [sourceText, setSourceText] = useState("");
  const variables = usePromptParser(sourceText);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  const formattedText = useMemo(() => {
    let result = sourceText;
    variables.forEach((variable) => {
      const value = variableValues[variable.id] || "";
      // Replace the entire match (variable + comment) with the value
      result = result.replaceAll(variable.originalTag, value);
    });
    return result;
  }, [sourceText, variables, variableValues]);

  const handleSourceTextChange = (newText: string) => {
    setSourceText(newText);
    // Reset variable values when source text changes
    setVariableValues({});
  };

  const handleVariableValueChange = (variableId: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variableId]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <SourceEditor value={sourceText} onChange={handleSourceTextChange} />
        <VariableInputsList
          variables={variables}
          values={variableValues}
          onVariableChange={handleVariableValueChange}
        />
      </div>
      <div className="space-y-4">
        <PreviewPanel formattedText={formattedText} />
        <CopyButton textToCopy={formattedText} />
      </div>
    </div>
  );
}
