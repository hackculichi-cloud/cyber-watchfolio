import Tag from "@/components/shared/Tag";
import type { ToolGroup } from "@/data/tools";

const ProfileTools = ({ groups }: { groups: ToolGroup[] }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {groups.map((group) => (
      <div key={group.title} className="panel-glow hover:-translate-y-1">
        <h3 className="text-sm font-semibold">{group.title}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {group.items.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ProfileTools;
