import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

interface VariableInputProps {
  name: string;
  value: string;
  originalTag: string;
  onChange: (value: string) => void;
}

export function VariableInput({ name, value, originalTag, onChange }: VariableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`var-${name}`} className="grid gap-2">
        <span>{name}</span>
      </Label>

      <Textarea
        id={`var-${name}`}
        placeholder={originalTag}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] font-mono"
        aria-label={`Value for variable ${name}`}
      />
    </div>
  );
}
