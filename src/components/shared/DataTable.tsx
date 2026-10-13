import { useLanguage } from "@/i18n/LanguageProvider";
interface DataTableProps {
  columns: string[];
  rows: (string | undefined)[][];
}

const DataTable = ({ columns, rows }: DataTableProps) => {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-xs font-mono">
        <thead>
          <tr className="bg-secondary/60">
            {columns.map((c) => (
              <th
                key={c}
                className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-primary font-semibold border-b border-border"
              >
                {t(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/30">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-muted-foreground align-top">
                  {t(cell || "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
