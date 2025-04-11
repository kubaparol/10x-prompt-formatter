import { Label } from "@/components/ui/label";

interface PreviewPanelProps {
  formattedText: string;
}

export function PreviewPanel({ formattedText }: PreviewPanelProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="preview">Preview</Label>
      <div
        id="preview"
        className="min-h-[200px] p-4 rounded-md border bg-muted font-mono whitespace-pre-wrap break-words"
        role="region"
        aria-label="Formatted text preview"
        aria-live="polite"
        tabIndex={0}
      >
        {formattedText || <span className="text-muted-foreground">Formatted text will appear here...</span>}
      </div>
    </div>
  );
}
