export type IncidentStatus = "reported" | "confirmed" | "in_progress" | "resolved" | "rejected";

export type IncidentItem = {
  id: string;
  title: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  district: string;
  address: string;
  upvotes: number;
  comments: number;
  status: IncidentStatus;
  reportedAt: string;
  reporter: string;
};

export const primaryNav = [
  { href: "/", label: "Map" },
  { href: "/report", label: "Report" },
  { href: "/my-reports", label: "My Reports" },
  { href: "/dashboard", label: "Dashboard" },
];

export const adminNav = [
  { href: "/admin", label: "Operations" },
  { href: "/dashboard", label: "Analytics" },
  { href: "/my-reports", label: "Citizen View" },
];

export const cityStats = [
  { label: "Total incidents", value: "245", meta: "Last 30 days" },
  { label: "Resolved rate", value: "67%", meta: "Target > 70%" },
  { label: "New today", value: "12", meta: "Live update every minute" },
  { label: "Avg resolution", value: "3.2 days", meta: "Across all districts" },
];

export const incidentFeed: IncidentItem[] = [
  {
    id: "INC-1042",
    title: "Deep pothole near school crosswalk",
    category: "Pothole",
    severity: "high",
    district: "District 3",
    address: "Vo Van Tan St, Ward 5",
    upvotes: 34,
    comments: 6,
    status: "in_progress",
    reportedAt: "15 minutes ago",
    reporter: "Ngoc Tran",
  },
  {
    id: "INC-1037",
    title: "Garbage pile blocks sidewalk access",
    category: "Garbage",
    severity: "medium",
    district: "District 1",
    address: "Nguyen Hue Blvd, Ben Nghe",
    upvotes: 18,
    comments: 4,
    status: "confirmed",
    reportedAt: "1 hour ago",
    reporter: "Minh Le",
  },
  {
    id: "INC-1026",
    title: "Flooding at underpass during heavy rain",
    category: "Flood",
    severity: "critical",
    district: "Thu Duc City",
    address: "Ha Noi Hwy underpass",
    upvotes: 57,
    comments: 12,
    status: "reported",
    reportedAt: "2 hours ago",
    reporter: "Anh Pham",
  },
  {
    id: "INC-1019",
    title: "Streetlight outage on main arterial road",
    category: "Broken Infra",
    severity: "medium",
    district: "Binh Thanh",
    address: "Dien Bien Phu St, Ward 25",
    upvotes: 22,
    comments: 3,
    status: "resolved",
    reportedAt: "Yesterday",
    reporter: "Thu Ho",
  },
];

export const dashboardCards = [
  { label: "Pending validation", value: "43", trend: "+8 from yesterday" },
  { label: "Assigned to teams", value: "71", trend: "+14 this week" },
  { label: "Resolved this week", value: "89", trend: "+23% week-over-week" },
  { label: "Critical incidents", value: "16", trend: "-3 after intervention" },
];

export const trendSeries = [
  { day: "Mon", incidents: 28 },
  { day: "Tue", incidents: 34 },
  { day: "Wed", incidents: 31 },
  { day: "Thu", incidents: 42 },
  { day: "Fri", incidents: 39 },
  { day: "Sat", incidents: 26 },
  { day: "Sun", incidents: 22 },
];

export const categoryBreakdown = [
  { label: "Pothole", value: 30, color: "#ff7162" },
  { label: "Flood", value: 22, color: "#85adff" },
  { label: "Garbage", value: 18, color: "#fecb00" },
  { label: "Broken Infra", value: 14, color: "#f59e0b" },
  { label: "Traffic", value: 10, color: "#14b8a6" },
  { label: "Pollution", value: 6, color: "#a78bfa" },
];

export const statusTimeline = [
  { status: "reported", title: "Citizen reported incident", time: "09:20 AM, Apr 17" },
  { status: "confirmed", title: "Community reached 5 confirms", time: "10:05 AM, Apr 17" },
  { status: "in_progress", title: "District operations accepted task", time: "11:18 AM, Apr 17" },
  { status: "resolved", title: "Road maintenance completed patch", time: "04:42 PM, Apr 17" },
];

export const quickActions = [
  { href: "/report", label: "Create new report" },
  { href: "/dashboard", label: "Open analytics dashboard" },
  { href: "/admin", label: "Go to admin operations" },
  { href: "/my-reports", label: "Review my submissions" },
];

export const authHighlights = [
  "Realtime incident map with pulse status indicators",
  "AI-assisted category suggestions from uploaded images",
  "Status lifecycle from reported to resolved with timeline",
];
