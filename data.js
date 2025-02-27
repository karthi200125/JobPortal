import { FaSuitcase } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

// Filter Options
export const filterOptions = [
    {
        id: 1,
        title: "Date Posted",
        options: ['All Time', 'Past 24 hours', 'Past 3 days', 'Past Week', 'Past Month']
    },
    {
        id: 2,
        title: "Experience Level",
        options: ['All Level', 'Internship', 'Entry level', 'Associate', 'Mid Senior Level', 'Director']
    },
    {
        id: 3,
        title: "Experience Level",
        options: ['All Level', 'Internship', 'Entry level', 'Associate', 'Mid Senior Level', 'Director']
    },
];

// languages
// app/utils/languages.ts
export const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
];


// Landing page navlinks
export const LpNavJobs = [
    {
        id: 1,
        title: "Popular Categories",
        subCat: [
            { id: 1, subCatTitle: "IT Jobs", herf: "" },
            { id: 2, subCatTitle: "Sales Jobs", herf: "" },
            { id: 3, subCatTitle: "Marketing Jobs", herf: "" },
            { id: 4, subCatTitle: "Data Sceince Jobs", herf: "" },
            { id: 5, subCatTitle: "HR Jobs", herf: "" },
            { id: 6, subCatTitle: "Engineering Jobs", herf: "" },
        ]
    },
    {
        id: 2,
        title: "Jobs in Demand",
        subCat: [
            { id: 1, subCatTitle: "Fresher Jobs", herf: "" },
            { id: 2, subCatTitle: "MNC Jobs", herf: "" },
            { id: 3, subCatTitle: "Remote Jobs", herf: "" },
            { id: 4, subCatTitle: "Work From Home Jobs", herf: "" },
            { id: 5, subCatTitle: "Walkin Jobs", herf: "" },
            { id: 6, subCatTitle: "Part Time Jobs", herf: "" },
        ]
    },
    {
        id: 2,
        title: "Jobs By Location",
        subCat: [
            { id: 1, subCatTitle: "Jobs in Chennai", herf: "" },
            { id: 2, subCatTitle: "Jobs in Bangalore", herf: "" },
            { id: 3, subCatTitle: "Jobs in Mumbai", herf: "" },
            { id: 4, subCatTitle: "Jobs in Delhi", herf: "" },
            { id: 5, subCatTitle: "Jobs in Hyderabad", herf: "" },
            { id: 6, subCatTitle: "Jobs in Pune", herf: "" },
        ]
    },
]

// Landing page Navbar companies
export const LpNavCompanies = [
    {
        id: 1,
        title: "Explore Categories",
        subCat: [
            { id: 1, subCatTitle: "Unicorn", href: "" },
            { id: 2, subCatTitle: "MNC", href: "" },
            { id: 3, subCatTitle: "Startup", href: "" },
            { id: 4, subCatTitle: "Product based", href: "" },
            { id: 5, subCatTitle: "Internet", href: "" },
        ]
    },
    {
        id: 2,
        title: "Explore Collections",
        subCat: [
            { id: 1, subCatTitle: "Top companies", href: "" },
            { id: 2, subCatTitle: "IT companies", href: "" },
            { id: 3, subCatTitle: "Fintech companies", href: "" },
            { id: 4, subCatTitle: "Sponsored companies", href: "" },
            { id: 5, subCatTitle: "Featured companies", href: "" },
        ]
    },
    {
        id: 3,
        title: "Research Companies",
        subCat: [
            { id: 1, subCatTitle: "Ambitionbox", href: "" },
            { id: 2, subCatTitle: "Interview questions", href: "" },
            { id: 3, subCatTitle: "Company salaries", href: "" },
            { id: 4, subCatTitle: "Company reviews", href: "" },
            { id: 5, subCatTitle: "Salary Calculator", href: "" },
        ]
    },
];

// Landing page Navbar services
export const LpNavServices = [
    {
        id: 1,
        title: "Resume Writing",
        subCat: [
            { id: 1, subCatTitle: "Text resume", href: "" },
            { id: 2, subCatTitle: "Visual resume", href: "" },
            { id: 3, subCatTitle: "Resume critique", href: "" },
        ]
    },
    {
        id: 2,
        title: "Find Jobs",
        subCat: [
            { id: 1, subCatTitle: "Jobs4u", href: "" },
            { id: 2, subCatTitle: "Priority applicant", href: "" },
            { id: 3, subCatTitle: "Contact us", href: "" },
        ]
    },
    {
        id: 3,
        title: "Get Recruiter's Attention",
        subCat: [
            { id: 1, subCatTitle: "Resume display", href: "" },
            { id: 2, subCatTitle: "Monthly subscriptions", href: "" },
        ]
    },
    {
        id: 4,
        title: "Basic & Premium Plans",
        subCat: [
            { id: 1, subCatTitle: "Free resume resources", href: "" },
            { id: 2, subCatTitle: "Resume quality score", href: "" },
            { id: 3, subCatTitle: "Resume samples", href: "" },
            { id: 4, subCatTitle: "Job letter samples", href: "" },
        ]
    },
];

// profile card items
export const profileCardItems = [
    {
        id: 1,
        title: "Profile",
        icon: <IoPersonOutline size={20} />,
        href: "/userProfile"
    },
    {
        id: 2,
        title: "Jobs",
        icon: <FaSuitcase size={20} />,
        href: "/jobs"
    },
    {
        id: 3,
        title: "Dashboard",
        icon: <MdDashboard size={20} />,
        href: "/dashboard"
    },
    {
        id: 4,
        title: "Sign Out",
        icon: <PiSignOutBold size={20} />,
        href: "/"
    },
];

// education levels
export const education_levels = [
    "10th",
    "12th",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (Ph.D.)",
    "Post Doctorate"
]

export const fields_of_study = [
    "Arts",
    "Science",
    "Commerce",
    "Engineering",
    "Medical",
    "Law",
    "Management",
    "Pharmacy",
    "Education",
    "Architecture",
    "Agriculture",
    "Design",
    "Journalism & Mass Communication",
    "Hospitality & Tourism",
    "Computer Applications",
    "Social Sciences",
    "Fine Arts",
    "Performing Arts",
    "Vocational Studies"
];

export const subscriptionPlans = {
    CANDIDATE: [
        { name: "Free", features: ["Apply to jobs", "Limited profile views", "Message Any Profile"], price: "0", type: "Free" },
        { name: "Premium", features: ["Resume boost", "Profile visibility", "Job alerts"], price: "499", type: "Monthly" },
        { name: "VIP Lifetime", features: ["Resume review", "Unlimited applications"], price: "2,999", type: "One-Time" },
    ],
    RECRUITER: [
        { name: "Basic", features: ["5 job posts", "Limited candidate views"], price: "1,499", type: "Monthly" },
        { name: "Standard", features: ["20 job posts", "Resume access", "Premium placement"], price: "5,999", type: "Monthly" },
        { name: "Enterprise", features: ["Unlimited job posts", "AI-matching", "Priority support"], price: "15,000", type: "Annual" },
    ],
    ORGANIZATION: [
        { name: "Startup", features: ["10 job slots", "Team access"], price: "9,999", type: "Annual" },
        { name: "Growth", features: ["50 job slots", "Advanced analytics"], price: "29,999", type: "Annual" },
        { name: "Enterprise", features: ["Unlimited job slots", "Custom solutions"], price: "Custom", type: "Custom Pricing" },
    ],
};


