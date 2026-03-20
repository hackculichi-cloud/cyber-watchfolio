import { useEffect, useState } from "react";

const LOG_LINES = [
  "[2024-03-20 14:23:01] INFO  - Firewall rule updated: ALLOW TCP 443",
  "[2024-03-20 14:23:02] WARN  - Unusual login attempt from 192.168.1.105",
  "[2024-03-20 14:23:03] INFO  - IDS signature update completed",
  "[2024-03-20 14:23:04] ALERT - Brute force detected on SSH port 22",
  "[2024-03-20 14:23:05] INFO  - SSL certificate renewed for *.corp.net",
  "[2024-03-20 14:23:06] WARN  - DNS query anomaly detected: entropy 4.8",
  "[2024-03-20 14:23:07] INFO  - Endpoint scan completed: 254 hosts",
  "[2024-03-20 14:23:08] ALERT - Malware signature match: Trojan.GenericKD",
  "[2024-03-20 14:23:09] INFO  - VPN tunnel established: Site-A <-> Site-B",
  "[2024-03-20 14:23:10] WARN  - Port scan detected from 10.0.0.42",
  "[2024-03-20 14:23:11] INFO  - SIEM correlation rule triggered: R-2847",
  "[2024-03-20 14:23:12] ALERT - Privilege escalation attempt blocked",
  "[2024-03-20 14:23:13] INFO  - Backup verification: integrity check passed",
  "[2024-03-20 14:23:14] WARN  - Certificate expiring in 7 days: api.internal",
  "[2024-03-20 14:23:15] INFO  - Network baseline updated successfully",
  "[2024-03-20 14:23:16] ALERT - C2 beacon detected: callback interval 60s",
  "[2024-03-20 14:23:17] INFO  - Patch deployment: 12/15 systems updated",
  "[2024-03-20 14:23:18] WARN  - Failed auth: admin@10.0.0.1 (attempt 3/5)",
  "[2024-03-20 14:23:19] INFO  - Threat intel feed synchronized: 1,247 IOCs",
  "[2024-03-20 14:23:20] ALERT - Data exfiltration attempt: 2.3GB outbound",
];

const LogBackground = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % LOG_LINES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const visibleLines = [...LOG_LINES, ...LOG_LINES].slice(offset, offset + 15);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
      <div className="absolute inset-0 font-mono text-xs leading-6 text-primary whitespace-nowrap p-8">
        {visibleLines.map((line, i) => (
          <div key={`${offset}-${i}`} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogBackground;
