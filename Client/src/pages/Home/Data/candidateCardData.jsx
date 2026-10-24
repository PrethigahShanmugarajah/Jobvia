import {
  Award,
  Briefcase,
  Clock,
  Globe,
  GraduationCap,
  Lightbulb,
  Star,
  UserGroup,
  Users,
  Zap,
} from "lucide-react";
import { cardColors } from "../../../constants/cardColors";

export const cardData = [
  {
    id: 1,
    title: "RECENT GRADUATES",
    icon: <GraduationCap />,
    description:
      "Fresh talent ready to innovate with modern skills and energy.",
    colors: cardColors.blue,
    points: [
      {
        text: "Modern Tech Skills",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        text: "Quick Adaptation",
        icon: <Clock className="w-4 h-4" />,
      },
      {
        text: "Fresh Perspectives",
        icon: <Lightbulb className="w-4 h-4" />,
      },
    ],
    stats: "90% tech-proficient",
    statIcon: <Star className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "SKILLED NEWCOMERS",
    icon: <Globe />,
    description: "Global experience meets local opportunity.",
    colors: cardColors.emerald,
    points: [
      {
        text: "Multilingual",
        icon: <Globe className="w-4 h-4" />,
      },
      {
        text: "Global Perspective",
        icon: <Globe className="w-4 h-4" />,
      },
      {
        text: "Resilient",
        icon: <Award className="w-4 h-4" />,
      },
    ],
    stats: "3+ years experience",
    statIcon: <Award className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "CO-OP STUDENTS",
    icon: <Briefcase />,
    description: "Eager learners bridging theory with practice.",
    colors: cardColors.violet,
    points: [
      {
        text: "Academic Excellence",
        icon: <GraduationCap className="w-4 h-4" />,
      },
      {
        text: "Team Collaboration",
        icon: <UserGroup className="w-4 h-4" />,
      },
      {
        text: "Tech Enthusiasts",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
    stats: "4.0+ avg GPA",
    statIcon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 4,
    title: "EXPERIENCED PROFESSIONALS",
    icon: <Users />,
    description: "Seasoned experts driving innovation forward.",
    colors: cardColors.amber,
    points: [
      {
        text: "Leadership",
        icon: <Users className="w-4 h-4" />,
      },
      {
        text: "Strategic Insight",
        icon: <Lightbulb className="w-4 h-4" />,
      },
      {
        text: "Mentorship",
        icon: <UserGroup className="w-4 h-4" />,
      },
    ],
    stats: "10+ years experience",
    statIcon: <Award className="w-4 h-4" />,
  },
];
