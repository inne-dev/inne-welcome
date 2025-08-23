import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
  Sun,
  Moon,
  Github,
  Send,
  ExternalLink,
  Globe,
  Bot,
  MessageSquare,
} from "lucide-react";

type Language = "en" | "uk" | "ru";

interface Translations {
  [key: string]: {
    en: string;
    uk: string;
    ru: string;
  };
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
  contacts: {
    en: "Contacts",
    uk: "Контакти",
    ru: "Контакты",
  },
  blog: {
    en: "Personal Blog",
    uk: "Особистий Блог",
    ru: "Личный Блог",
  },
  blogDesc: {
    en: "Sharing notes about development and infrastructure. These are short and practical texts — solutions from real tasks that can be quickly applied in practice. And so I don't forget them myself ;3",
    uk: "Ділюся нотатками про розробку та інфраструктуру. Це короткі та практичні тексти — рішення з реальних задач, які можна швидко застосувати на практиці. Ну і самому не забути ;3",
    ru: "Делюсь заметками о разработке и инфраструктуре. Это короткие и практичные тексты — решения из реальных задач, которые можно быстро применить на практике. Ну и самому не забыть ;3",
  },
  pinflBot: {
    en: "PINFL Analyser",
    uk: "PINFL Analyser",
    ru: "PINFL Analyser",
  },
  pinflDesc: {
    en: "A small pet project: a Telegram bot for generating and checking PINFL numbers of Uzbekistan, created for the convenience of development and testing.",
    uk: "Невеликий пет-проект: бот в Telegram для генерації та перевірки PINFL номерів Узбекистану, створений для зручності розробки та тестування.",
    ru: "Небольшой инструмент для генерации и проверки PINFL номеров Узбекистана, созданный для удобства разработки и тестирования.",
  },
  dialogy: {
    en: "Dialogy",
    uk: "Dialogy",
    ru: "Dialogy",
  },
  dialogyDesc: {
    en: "A small application for calls. With its help you can count how much time everyone managed to talk, and it gives a simple picture of the meeting. Made to make team discussions a bit shorter and more informative.",
    uk: "Маленький застосунок для дзвінків. За його допомогою ви можете порахувати, скільки часу кожен встиг поговорити, і він дає просту картинку зустрічі. Зроблено, щоб командні обговорення були трохи коротшими та інформативнішими.",
    ru: "Маленькое приложение для созвонов. С его помощью вы можете посчитать, сколько времени каждый успел поговорить, и даёт простую картинку встречи. Сделано, чтобы командные обсуждения были чуть более короткими и информативными.",
  },
  viewProject: {
    en: "View Project",
    uk: "Переглянути Проєкт",
    ru: "Посмотреть Проект",
  },
  openBot: {
    en: "Open Bot",
    uk: "Відкрити Бот",
    ru: "Открыть Бот",
  },
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

  const projects = [
    {
      title: t("blog"),
      description: t("blogDesc"),
      url: `https://blog.inne.space/${language}/posts`,
      icon: <Globe className="w-5 h-5" />,
      tags: ["Ruby on Rails", "SQLite3"],
    },
    {
      title: t("pinflBot"),
      description: t("pinflDesc"),
      url: "https://t.me/PINFLHelperBot",
      icon: <Bot className="w-5 h-5" />,
      tags: ["Python"],
    },
    {
      title: t("dialogy"),
      description: t("dialogyDesc"),
      url: "https://dialogy.inne.space",
      icon: <MessageSquare className="w-5 h-5" />,
      tags: ["React", "Golang", "SQLite3"],
    },
  ];

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
              {(["en", "uk", "ru"] as Language[]).map((lang) => (
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
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="mb-8 h-10 flex items-center">{t("projects")}</h2>
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-md transition-shadow min-h-[180px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center flex-shrink-0">
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 h-7 flex items-center">
                        {project.title}
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
                    onClick={() => window.open(project.url, "_blank")}
                    className="flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground leading-relaxed min-h-[60px]">
                  {project.description}
                </p>
              </Card>
            ))}
          </div>
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>© 2025 inne.space</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
