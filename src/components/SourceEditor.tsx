import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SourceEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function SourceEditor({ value, onChange }: SourceEditorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="source">Source Text</Label>
      <Textarea
        id="source"
        placeholder="Enter your text with {{variables}} here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[400px] font-mono"
        aria-label="Source text with variables"
      />
    </div>
  );
}
