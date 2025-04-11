import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface VariableInputProps {
  name: string;
  value: string;
  originalTag: string;
  onChange: (value: string) => void;
}

export function VariableInput({ name, value, originalTag, onChange }: VariableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`var-${name}`} className="flex items-center gap-2">
        <span>{name}</span>
        <span className="text-sm text-muted-foreground font-mono">{originalTag}</span>
      </Label>
      <Input
        type="text"
        id={`var-${name}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Value for ${name}...`}
        aria-label={`Value for variable ${name}`}
      />
    </div>
  );
}
