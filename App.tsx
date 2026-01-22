import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Sun,
  Moon,
  Github,
  Send,
  ArrowRight,
  Globe,
  Bot,
  MessageSquare,
  Linkedin,
  CheckCircle,
  FileText,
} from "lucide-react";
import yaml from "js-yaml";

type Language = "en" | "uk" | "ru";

interface Translations {
  [key: string]: {
    en: string;
    uk: string;
    ru: string;
  };
}

interface ProjectConfig {
  id: string;
  title: {
    en: string;
    uk: string;
    ru: string;
  };
  description: {
    en: string;
    uk: string;
    ru: string;
  };
  url: string;
  icon: string;
  tags: string[];
  disabled: boolean;
  disabledReason: {
    en: string;
    uk: string;
    ru: string;
  };
}

interface ProjectsYamlData {
  projects: ProjectConfig[];
}

interface ExperienceConfig {
  id: string;
  company: {
    en: string;
    uk: string;
    ru: string;
  };
  position: {
    en: string;
    uk: string;
    ru: string;
  };
  description: {
    en: string;
    uk: string;
    ru: string;
  };
  startDate: string;
  endDate: string | null;
  tags: string[];
}

interface ExperienceYamlData {
  experience: ExperienceConfig[];
}

const translations: Translations = {
  name: {
    en: "Backend Developer",
    uk: "Backend Розробник",
    ru: "Backend Разработчик",
  },
  intro: {
    en: "Working on creating and maintaining web services, integrations, and application optimization. In my free time, I study new technologies, experiment with pet projects, and take interest in artificial intelligence. It's important to me that my solutions bring real value to people.",
    uk: "Працюю над створенням і підтримкою веб-сервісів, інтеграціями та оптимізацією додатків. У вільний час вивчаю нові технології, експериментую з pet-проєктами і цікавлюся штучним інтелектом. Для мене важливо, щоб мої рішення приносили реальну користь людям.",
    ru: "Работаю над созданием и поддержкой веб-сервисов, интеграциями и оптимизацией приложений. В свободное время изучаю новые технологии, экспериментирую с pet-проектами и интересуюсь искусственным интеллектом. Мне важно, чтобы мои решения приносили реальную пользу людям.",
  },
  projects: {
    en: "Projects",
    uk: "Проєкти",
    ru: "Проекты",
  },
  experience: {
    en: "Experience",
    uk: "Досвід",
    ru: "Опыт",
  },
  totalExperience: {
    en: "Total experience",
    uk: "Загальний досвід",
    ru: "Общий опыт",
  },
  currentlyWorking: {
    en: "Currently working",
    uk: "Працюю зараз",
    ru: "Работаю до сих пор",
  },
  contacts: {
    en: "Contacts",
    uk: "Контакти",
    ru: "Контакты",
  },
  jobSearchStatus: {
    en: "Looking for new opportunities — reach me via the Contacts section",
    uk: "Шукаю нові можливості — зв'язатися можна через розділ «Контакти»",
    ru: "Ищу новые возможности — связаться можно через раздел контактов",
  },
};

const iconMap: { [key: string]: JSX.Element } = {
  Globe: <Globe className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("inne-language");
    if (saved) {
      return saved as Language;
    }

    // Detect system language
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.includes("uk") || systemLang.includes("ua")) {
      return "uk";
    } else if (systemLang.includes("ru")) {
      return "ru";
    }
    return "en";
  });
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("inne-theme");
    if (saved) {
      return saved !== "light";
    }

    // Detect system theme preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [projectsConfig, setProjectsConfig] = useState<ProjectsYamlData | null>(
    null,
  );

  const [experienceConfig, setExperienceConfig] =
    useState<ExperienceYamlData | null>(null);

  useEffect(() => {
    fetch("/projects.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text) as ProjectsYamlData;
        setProjectsConfig(data);
      })
      .catch((error) => console.error("Error loading projects:", error));

    fetch("/experience.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text) as ExperienceYamlData;
        setExperienceConfig(data);
      })
      .catch((error) => console.error("Error loading experience:", error));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("inne-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("inne-language", language);
  }, [language]);

  const t = (key: string) => translations[key]?.[language] || key;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString(
      language === "ru" ? "ru-RU" : language === "uk" ? "uk-UA" : "en-US",
      { month: "long" },
    );
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const calculateTotalExperience = (experiences: ExperienceConfig[]) => {
    let totalMonths = 0;

    experiences.forEach((exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();

      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      totalMonths += months + 1; // Include both start and end month
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (language === "ru" || language === "uk") {
      const yearsText =
        language === "ru"
          ? years === 1
            ? "год"
            : years > 1 && years < 5
              ? "года"
              : "лет"
          : years === 1
            ? "рік"
            : years > 1 && years < 5
              ? "роки"
              : "років";
      const monthsText =
        language === "ru"
          ? months === 1
            ? "месяц"
            : months > 1 && months < 5
              ? "месяца"
              : "месяцев"
          : months === 1
            ? "місяць"
            : months > 1 && months < 5
              ? "місяці"
              : "місяців";

      if (years > 0 && months > 0) {
        return `${years} ${yearsText} ${months} ${monthsText}`;
      } else if (years > 0) {
        return `${years} ${yearsText}`;
      } else {
        return `${months} ${monthsText}`;
      }
    } else {
      if (years > 0 && months > 0) {
        return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
      } else if (years > 0) {
        return `${years} year${years > 1 ? "s" : ""}`;
      } else {
        return `${months} month${months > 1 ? "s" : ""}`;
      }
    }
  };

  const projects = projectsConfig
    ? projectsConfig.projects.map((project) => ({
        ...project,
        url: project.url.replace("{language}", language),
      }))
    : [];

  const experience = experienceConfig ? experienceConfig.experience : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                I
              </span>
            </div>
            <span className="font-medium">inne.space</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-1">
              {(["en", "ru"] as Language[]).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage(lang)}
                  className="text-xs px-2 py-1"
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h1 className="mb-4">Inne | Andy</h1>
            <h2 className="text-muted-foreground mb-6 h-8 flex items-center">
              {t("name")}
            </h2>
            <p className="text-muted-foreground w-full max-w-2xl leading-relaxed min-h-[120px] flex items-start">
              {t("intro")}
            </p>
            {experience && experience.length > 0 && (
              <div className="text-muted-foreground mt-4">
                <span className="font-medium">{t("totalExperience")}:</span>{" "}
                {calculateTotalExperience(experience)}
              </div>
            )}
          </div>
          {experience && experience.length > 0 && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{t("jobSearchStatus")}</span>
            </div>
          )}
        </section>

        {/* Projects & Experience Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
              <TabsTrigger value="experience">{t("experience")}</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-0">
              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-md transition-shadow min-h-[180px]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center flex-shrink-0">
                          {iconMap[project.icon]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-1 h-7 flex items-center">
                            {project.title[language]}
                          </h3>
                          <div className="flex gap-1 flex-wrap min-h-[24px] items-start">
                            {project.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => (window.location.href = project.url)}
                        disabled={project.disabled}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                    {project.disabled && project.disabledReason[language] && (
                      <div className="mb-3 p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/30 rounded">
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                          {project.disabledReason[language]}
                        </p>
                      </div>
                    )}
                    <p className="text-muted-foreground leading-relaxed min-h-[60px]">
                      {project.description[language]}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-0">
              <div className="grid gap-6">
                {experience.map((exp, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-lg">
                        {exp.position[language]}
                      </h3>
                      <div className="text-muted-foreground mb-2">
                        {exp.company[language]}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate
                          ? formatDate(exp.endDate)
                          : t("currentlyWorking")}
                      </div>
                      <div className="flex gap-1 flex-wrap min-h-[24px] items-start mb-3">
                        {exp.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-muted-foreground leading-relaxed space-y-2">
                      {exp.description[language]
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{line.replace(/^- /, "").trim()}</span>
                          </div>
                        ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Contacts Section */}
        <section>
          <h2 className="mb-8 h-10 flex items-center">{t("contacts")}</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/inne-dev", "_blank")
              }
              className="flex items-center gap-2 w-[120px] justify-center"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://t.me/inne_dev", "_blank")}
              className="flex items-center gap-2 w-[120px] justify-center"
            >
              <Send className="w-4 h-4" />
              Telegram
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/andy-litvinov-635925289/",
                  "_blank",
                )
              }
              className="flex items-center gap-2 w-[120px] justify-center"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://hh.ru/resume/2e015778ff0be97e8b0039ed1f784254304a57",
                  "_blank",
                )
              }
              className="flex items-center gap-2 w-[120px] justify-center"
            >
              <FileText className="w-4 h-4" />
              HH.ru
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>© 2026 inne.space</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
