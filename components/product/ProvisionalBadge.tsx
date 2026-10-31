import { Badge } from "@/components/ui/Badge";
import type { Confidence } from "@/types/content";

interface ProvisionalBadgeProps {
  confidence: Confidence;
  label: string;
}

/**
 * confidence が 'confirmed' 以外の場合に「仮データ(確認中)」表示を行う。
 * confirmed の場合は何も表示しない。
 */
export function ProvisionalBadge({ confidence, label }: ProvisionalBadgeProps) {
  if (confidence === "confirmed") {
    return null;
  }
  return <Badge tone="warning">{label}</Badge>;
}
