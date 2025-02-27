window.SkillColors = {
  Green: "#54C784",
  Yellow: "#FFBE01",
  Red: "#EF370B",
  Gray: "#D5D5D5",
};

window.skillsData = {
  id: "skill-footprint",
  name: "Skill Footprint",
  children: [
    // From "Core Technical Skills"
    {
      id: "programming-languages",
      name: "Programming Languages",
      value: 76,
      expected: 54,
      children: [
        { id: "python", name: "Python", value: 78, expected: 50 },
        { id: "javascript", name: "JavaScript", value: 65, expected: 40 },
        { id: "java", name: "Java", value: 85, expected: 60 },
        { id: "c-plus-plus", name: "C++", value: 75, expected: 65 },
      ],
    },
    {
      id: "algorithms-data-structures",
      name: "Algorithms & Data Structures",
      value: 80,
      expected: 60,
      children: [
        {
          id: "arrays-strings",
          name: "Arrays & Strings",
          value: 55,
          expected: 55,
        },
        { id: "graphs", name: "Graphs", value: 85, expected: 67 },
        {
          id: "dynamic-programming",
          name: "Dynamic Programming",
          value: 70,
          expected: 54,
        },
        {
          id: "sorting-searching",
          name: "Sorting & Searching",
          value: 85,
          expected: 65,
        },
      ],
    },
    {
      id: "system-design",
      name: "System Design",
      value: 80,
      expected: 63,
      children: [
        { id: "api-design", name: "API Design", value: 60, expected: 60 },
        { id: "scalability", name: "Scalability", value: 80, expected: 60 },
        { id: "microservices", name: "Microservices", value: 75, expected: 65 },
        {
          id: "load-balancing",
          name: "Load Balancing",
          value: 90,
          expected: 65,
        },
      ],
    },
    // From "Software Development Practices"
    {
      id: "version-control",
      name: "Version Control",
      value: 68,
      expected: 60,
      children: [
        { id: "git", name: "Git", value: 70, expected: 60 },
        { id: "gitflow", name: "GitFlow", value: 65, expected: 60 },
      ],
    },
    {
      id: "testing",
      name: "Testing",
      value: 70,
      expected: 58,
      children: [
        { id: "unit-testing", name: "Unit Testing", value: 65, expected: 65 },
        {
          id: "integration-testing",
          name: "Integration Testing",
          value: 75,
          expected: 55,
        },
        {
          id: "test-automation",
          name: "Test Automation",
          value: 70,
          expected: 55,
        },
      ],
    },
    {
      id: "code-quality",
      name: "Code Quality",
      value: 70,
      expected: 58,
      children: [
        { id: "code-reviews", name: "Code Reviews", value: 75, expected: 60 },
        { id: "refactoring", name: "Refactoring", value: 70, expected: 65 },
        {
          id: "static-analysis-tools",
          name: "Static Analysis Tools",
          value: 65,
          expected: 50,
        },
      ],
    },
    {
      id: "development-methodologies",
      name: "Development Methodologies",
      value: 73,
      expected: 60,
      children: [
        {
          id: "agile-practices",
          name: "Agile Practices",
          value: 70,
          expected: 60,
        },
        { id: "scrum", name: "Scrum", value: 75, expected: 60 },
      ],
    },
    // From "Infrastructure & Operations"
    {
      id: "cloud-platforms",
      name: "Cloud Platforms",
      value: 28,
      expected: 55,
      children: [
        { id: "aws", name: "AWS", value: 30, expected: 55 },
        {
          id: "google-cloud-platform",
          name: "Google Cloud Platform",
          value: 25,
          expected: 55,
        },
      ],
    },
    {
      id: "containerization-orchestration",
      name: "Containerization & Orchestration",
      value: 28,
      expected: 53,
      children: [
        { id: "docker", name: "Docker", value: 35, expected: 55 },
        { id: "kubernetes", name: "Kubernetes", value: 20, expected: 50 },
      ],
    },
    {
      id: "ci-cd",
      name: "CI/CD",
      value: 33,
      expected: 43,
      children: [
        { id: "jenkins", name: "Jenkins", value: 30, expected: 45 },
        {
          id: "github-actions",
          name: "GitHub Actions",
          value: 35,
          expected: 40,
        },
      ],
    },
    {
      id: "monitoring-observability",
      name: "Monitoring & Observability",
      value: 27,
      expected: 53,
      children: [
        { id: "prometheus", name: "Prometheus", value: 35, expected: 55 },
        { id: "grafana", name: "Grafana", value: 20, expected: 55 },
        {
          id: "logging-elk-stack",
          name: "Logging (ELK Stack)",
          value: 25,
          expected: 50,
        },
      ],
    },
    // From "Collaboration & Communication"
    {
      id: "verbal-communication",
      name: "Verbal Communication",
      value: 65,
      expected: 50,
      children: [
        {
          id: "team-discussions",
          name: "Team Discussions",
          value: 60,
          expected: 45,
        },
        {
          id: "client-interactions",
          name: "Client Interactions",
          value: 70,
          expected: 55,
        },
      ],
    },
    {
      id: "written-communication",
      name: "Written Communication",
      value: 65,
      expected: 38,
      children: [
        { id: "documentation", name: "Documentation", value: 70, expected: 35 },
        {
          id: "technical-writing",
          name: "Technical Writing",
          value: 40,
          expected: 40,
        },
      ],
    },
    {
      id: "collaboration-tools",
      name: "Collaboration Tools",
      value: 65,
      expected: 35,
      children: [
        { id: "jira", name: "Jira", value: 60, expected: 30 },
        { id: "confluence", name: "Confluence", value: 70, expected: 40 },
      ],
    },
    {
      id: "teamwork",
      name: "Teamwork",
      value: 85,
      expected: 48,
      children: [
        { id: "mentoring", name: "Mentoring", value: 80, expected: 55 },
        {
          id: "feedback-sharing",
          name: "Feedback Sharing",
          value: 90,
          expected: 40,
        },
      ],
    },
    // From "Problem-Solving & Critical Thinking"
    {
      id: "debugging",
      name: "Debugging",
      value: 35,
      expected: 60,
      children: [
        {
          id: "runtime-errors",
          name: "Runtime Errors",
          value: 40,
          expected: 70,
        },
        { id: "logical-bugs", name: "Logical Bugs", value: 30, expected: 50 },
      ],
    },
    {
      id: "root-cause-analysis",
      name: "Root Cause Analysis",
      value: 35,
      expected: 64,
      children: [
        {
          id: "incident-resolution",
          name: "Incident Resolution",
          value: 40,
          expected: 60,
        },
        { id: "post-mortems", name: "Post-Mortems", value: 30, expected: 68 },
      ],
    },
    {
      id: "critical-thinking",
      name: "Critical Thinking",
      value: 43,
      expected: 73,
      children: [
        {
          id: "decision-making",
          name: "Decision-Making",
          value: 45,
          expected: 80,
        },
        {
          id: "risk-assessment",
          name: "Risk Assessment",
          value: 40,
          expected: 65,
        },
      ],
    },
  ],
};
