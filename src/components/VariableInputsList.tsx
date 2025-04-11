import { VariableInput } from "./VariableInput";

interface VariableInstance {
  id: string;
  name: string;
  value: string;
  originalTag: string;
}

interface VariableInputsListProps {
  variables: VariableInstance[];
  values: Record<string, string>;
  onVariableChange: (variableId: string, value: string) => void;
}

export function VariableInputsList({ variables, values, onVariableChange }: VariableInputsListProps) {
  if (variables.length === 0) {
    return (
      <div className="text-muted-foreground text-sm p-4 border rounded-md bg-muted" role="status" aria-live="polite">
        No variables detected. Add variables using {"{{"}
        <span className="font-mono">variable</span>
        {"}}"} syntax in your text.
      </div>
    );
  }

  return (
    <div className="space-y-4" role="group" aria-label="Variable inputs" aria-describedby="variables-description">
      <p id="variables-description" className="sr-only">
        List of detected variables from your text. Each variable has an input field where you can enter its value.
      </p>
      {variables.map((variable) => (
        <VariableInput
          key={variable.id}
          name={variable.name}
          value={values[variable.id] || ""}
          originalTag={variable.originalTag}
          onChange={(value) => onVariableChange(variable.id, value)}
        />
      ))}
    </div>
  );
}
