export const projects = [
  {
    id: 'nba',
    title: 'NBA Over/Under Prediction Engine',
    description:
      'A fully automated, serverless NBA analytics platform that predicts player prop over/unders using an ML ensemble model — blending a Gradient Boosted Regressor with weighted rolling averages.',
    language: 'Python',
    route: '/projects/nba',
    github: 'https://github.com/n1ops/nba-betting-predictor',
    tech: [
      { name: 'AWS Lambda', color: '#ff9900' },
      { name: 'S3', color: '#569a31' },
      { name: 'DynamoDB', color: '#4053d6' },
      { name: 'EventBridge', color: '#e7157b' },
      { name: 'API Gateway', color: '#a166ff' },
      { name: 'SAM / CloudFormation', color: '#ff9900' },
      { name: 'scikit-learn', color: '#f7931e' },
      { name: 'Python', color: '#3776ab' },
      { name: 'GitHub Actions', color: '#2088ff' },
    ],
    overview:
      'A fully automated, serverless NBA analytics platform that predicts player prop over/unders using an ML ensemble model. Pulls live betting lines, delivers picks via a dashboard and Discord, and tracks accuracy over time. The entire system runs autonomously on AWS — data ingestion, stat processing, ML training, prediction generation, result verification, and Discord notifications — all on automated schedules, for $0/month.',
    architecture: [
      [
        { label: 'balldontlie API', variant: '' },
        { label: 'The Odds API', variant: '' },
      ],
      [{ label: '\u2460 Fetch Data \u03BB (10 AM UTC)', variant: '' }],
      [
        { label: 'S3 (Raw JSON)', variant: '' },
        { label: 'DynamoDB', variant: '' },
      ],
      [{ label: '\u2461 Process Stats \u03BB (11 AM UTC)', variant: '' }],
      [{ label: '\u2462 Predict \u03BB (12 PM UTC)', variant: 'accent' }],
      [
        { label: 'GBR Model (60%)', variant: '' },
        { label: 'Weighted Avg (40%)', variant: '' },
      ],
      [{ label: '\u2463 Discord Notify \u03BB', variant: '' }],
      [{ label: '\u2464 Verify Results \u03BB (2 PM UTC)', variant: '' }],
      [{ label: '\u2465 Train Model \u03BB (Sundays)', variant: 'accent' }],
      [{ label: 'API Gateway (Read-Only)', variant: 'success' }],
      [{ label: 'S3 Static Dashboard', variant: 'success' }],
    ],
    mlDetails: {
      title: 'How the Ensemble Model Works',
      description:
        'The engine uses two methods to predict player performance, then combines them. A Gradient Boosted Regressor (trained on 26 features including rolling averages, opponent defensive rating, pace, rest days, usage rate, and true shooting %) handles the non-linear relationships. A Weighted Rolling Average (last 5 games \u00D7 45% + last 10 \u00D7 30% + last 20 \u00D7 25%) provides a stable baseline. The final prediction blends both at 60/40. Confidence is scored 0\u2013100 based on consistency and edge size vs. live betting lines.',
      components: [
        {
          name: 'Gradient Boosted Regression (60%)',
          detail:
            '26-feature vector including rolling averages, trends, minutes, usage%, true shooting%, home/away, rest days, opponent defensive rating, pace, points allowed, and team injury count. 100 estimators, max depth 4, 5-fold cross-validation. Four separate models trained for points, rebounds, assists, and 3-pointers.',
        },
        {
          name: 'Weighted Rolling Average (40%)',
          detail:
            'Blends last 5-game average (45%), last 10-game (30%), and last 20-game (25%). Acts as a safety net — anchors predictions to actual recent performance and prevents extreme outlier predictions from the ML model.',
        },
      ],
    },
    features: [
      'ML ensemble predictions — GBR (26 features) blended with weighted rolling averages',
      'Live betting lines from The Odds API with edge detection (\u00B18% threshold)',
      '6 stat types — points, rebounds, assists, 3-pointers, PRA, team totals',
      'Confidence scoring — HIGH / MEDIUM / LOW based on edge size and player consistency',
      'Discord notifications — daily top 15 picks delivered automatically',
      'Rolling 30-day accuracy tracking by stat type and confidence level',
      'Dark-themed dashboard — filter by stat, confidence, or prediction method',
      'Player drill-down — ML vs WA breakdown, rolling averages, and trend data',
      'Weekly model retraining every Sunday on accumulated historical data',
      'Fully automated — zero manual intervention from ingestion to delivery',
    ],
    security: [
      'Read-only API — no public endpoint can modify data',
      'Rate limiting — API Gateway throttled at 5 req/sec, burst 10',
      'Input validation — all API parameters validated with regex',
      'No hardcoded secrets — all API keys in Lambda environment variables',
      'OIDC CI/CD — GitHub Actions uses federated auth, no static AWS keys',
      'S3 encryption — AES-256 server-side encryption on raw data',
      'DynamoDB backups — Point-in-Time Recovery on all tables',
      'Sanitized errors — API returns generic messages, no internal details leaked',
      'Least-privilege IAM — each Lambda has scoped permissions',
    ],
    learned: [
      'ML ensemble methods — gradient boosting, feature engineering, cross-validation, model serialization',
      'Event-driven architecture — EventBridge schedules, Lambda chaining, automated pipelines',
      'DynamoDB single-table design — composite keys, GSIs, efficient query patterns',
      'Serverless API design — API Gateway, rate limiting, input validation, CORS',
      'Security engineering — OIDC CI/CD, least-privilege IAM, encryption at rest',
      'Infrastructure as Code — SAM templates, CloudFormation, automated deployments',
    ],
  },
  {
    id: 'chess',
    title: 'Chess Analyzer with LLM Coaching',
    description:
      'A chess analysis pipeline that pulls Chess.com games, analyzes them with Stockfish, aggregates performance trends, and generates natural-language coaching insights via an LLM — delivered to Discord.',
    language: 'Python',
    route: '/projects/chess',
    github: 'https://github.com/n1ops/chess_analyzer',
    tech: [
      { name: 'Python', color: '#3776ab' },
      { name: 'Stockfish', color: '#58a843' },
      { name: 'OpenAI API', color: '#412991' },
      { name: 'python-chess', color: '#769656' },
      { name: 'Chess.com API', color: '#769656' },
      { name: 'Discord Webhook', color: '#5865f2' },
    ],
    overview:
      'A personal chess analysis pipeline that pulls Chess.com games, analyzes them with Stockfish, aggregates performance trends, and generates natural-language coaching insights via an LLM, delivered directly to Discord. Demonstrates engine-based analysis, structured analytics, LLM reasoning, and automation-ready design.',
    capabilities: [
      {
        name: 'Game Ingestion',
        detail:
          'Fetches recent rapid games from the Chess.com public API. Extracts PGNs, metadata, ECO codes, and opening information.',
      },
      {
        name: 'Engine Analysis',
        detail:
          'Uses Stockfish for move-by-move evaluation. Detects evaluation swings, blunders, mistakes, inaccuracies, and game loss points.',
      },
      {
        name: 'Aggregated Analytics',
        detail:
          'Average evaluation drop by move number, opening performance comparison, and top blunder motifs across recent games.',
      },
      {
        name: 'LLM Coaching Layer',
        detail:
          'Feeds structured analytics into an LLM to produce concise coaching insights — why certain openings underperform, common causes of evaluation loss, and targeted training recommendations.',
      },
      {
        name: 'Discord Integration',
        detail:
          'Posts summaries and coaching insights to Discord. Automatically splits messages to respect Discord\'s 2000-character limit.',
      },
    ],
    projectLayout: [
      'chess_analyzer/',
      '  aggregate.py            # Aggregated analytics',
      '  analysis.py             # Analysis orchestration',
      '  engine.py               # Stockfish wrapper',
      '  fetch_games.py          # Chess.com API client',
      '  parse_games.py          # PGN parsing',
      '  motifs.py               # Blunder motif detection',
      '  opening_detector.py     # ECO opening detection',
      '  config.py               # Settings',
      '  llm/',
      '    client.py             # LLM API client',
      '    build_prompt.py       # Prompt engineering',
      '  discord/',
      '    send_discord.py       # Discord webhook',
      '  run_init.py             # Main entry point',
      '  send_summary.py         # Summary delivery',
      '  send_llm_insight.py     # LLM coaching delivery',
    ],
    designPrinciples: [
      'Deterministic analysis first, LLM interpretation second — LLMs explain, never evaluate positions',
      'Cost-aware model usage — nano models first, larger models as needed',
      'Clear separation between analysis, aggregation, and delivery layers',
      'Each stage of the pipeline can be run independently',
    ],
    roadmap: [
      'Weekly automated summaries (AWS EventBridge + Lambda)',
      'Opening-specific coaching insights',
      'Per-game LLM explanations',
      'Long-term trend tracking',
      'Optional AWS Bedrock integration',
    ],
  },
  {
    id: 'terraform',
    title: 'Multi-Environment AWS Infrastructure',
    description:
      'Production-grade three-tier AWS infrastructure deployed across dev, staging, and prod environments using reusable Terraform modules, OIDC CI/CD, and defense-in-depth security.',
    language: 'HCL',
    route: '/projects/terraform',
    github: 'https://github.com/n1ops/terraform-project',
    tech: [
      { name: 'Terraform', color: '#7b42bc' },
      { name: 'AWS VPC', color: '#ff9900' },
      { name: 'ALB', color: '#ff9900' },
      { name: 'EC2 / ASG', color: '#ff9900' },
      { name: 'RDS PostgreSQL', color: '#336791' },
      { name: 'S3', color: '#569a31' },
      { name: 'CloudWatch', color: '#ff4f8b' },
      { name: 'GitHub Actions', color: '#2088ff' },
      { name: 'IAM / OIDC', color: '#dd344c' },
    ],
    overview:
      'A production-grade, three-tier web application infrastructure deployed across three isolated AWS environments (dev, staging, prod) using reusable Terraform modules. Demonstrates infrastructure-as-code best practices including modular design, environment isolation, least-privilege networking, supply chain hardening, and keyless CI/CD authentication via OIDC.',
    architecture: [
      [{ label: 'GitHub Actions (OIDC)', variant: 'accent' }],
      [{ label: 'Terraform Plan / Apply', variant: '' }],
      [
        { label: 'Dev (10.0.0.0/16)', variant: '' },
        { label: 'Staging (10.1.0.0/16)', variant: '' },
        { label: 'Prod (10.2.0.0/16)', variant: 'accent' },
      ],
      [{ label: 'Public Tier: ALB + NAT Gateway', variant: '' }],
      [{ label: 'Private Tier: ASG (EC2 nginx)', variant: '' }],
      [{ label: 'Data Tier: RDS PostgreSQL 15', variant: 'success' }],
      [{ label: 'CloudWatch Flow Logs', variant: '' }],
    ],
    modules: [
      {
        name: 'VPC Module',
        detail:
          'VPC with DNS support, 2 public and 2 private subnets across AZs, Internet Gateway, NAT Gateway with Elastic IP, route tables, and VPC Flow Logs capturing rejected traffic to CloudWatch.',
      },
      {
        name: 'ALB Module',
        detail:
          'Security group accepting TCP 80/443, internet-facing ALB with invalid header rejection, HTTP listener and target group with health checks every 30s, optional S3 access logging.',
      },
      {
        name: 'ASG Module',
        detail:
          'Latest Amazon Linux 2023 AMI lookup, IMDSv2 enforcement (hop limit 1), launch template with nginx user data, Auto Scaling in private subnets, CPU-based target tracking at 70%.',
      },
      {
        name: 'RDS Module',
        detail:
          'PostgreSQL 15 with gp3 encrypted storage (20\u2013100 GB autoscaling), SSL enforcement, scram-sha-256 passwords, connection/disconnection logging, Multi-AZ for production.',
      },
    ],
    security: [
      'Layered security groups \u2014 each tier accepts traffic only from the tier above via SG ID references',
      'Restricted egress \u2014 ALB reaches ASG on port 80 only; ASG reaches internet on 443/53; RDS has zero egress',
      'VPC Flow Logs \u2014 captures rejected traffic for security monitoring with configurable retention',
      'IMDSv2 enforcement \u2014 prevents SSRF-based credential theft on EC2 instances',
      'Private placement \u2014 EC2 instances in private subnets with no public IPs, NAT-only outbound',
      'SSL enforcement via RDS parameter group with scram-sha-256 password hashing',
      'Encrypted storage at rest, deletion protection and mandatory final snapshots in prod',
      'Invalid header rejection on ALB \u2014 mitigates HTTP request smuggling',
      'OIDC federation \u2014 no static IAM keys; GitHub Actions receives short-lived tokens',
      'SHA-pinned actions \u2014 all GitHub Actions pinned to full 40-character commit SHAs',
      'Exact provider pinning \u2014 AWS provider locked to version 5.100.0 with committed lock file',
      'Sensitive file protection \u2014 *.tfvars excluded from git; only example templates tracked',
    ],
    envConfig: [
      { env: 'Dev', cidr: '10.0.0.0/16', ec2: 't3.micro', asg: '2', rds: 'db.t3.micro', multiAz: 'No', retention: '14d' },
      { env: 'Staging', cidr: '10.1.0.0/16', ec2: 't3.small', asg: '2', rds: 'db.t3.micro', multiAz: 'No', retention: '14d' },
      { env: 'Prod', cidr: '10.2.0.0/16', ec2: 't3.medium', asg: '3', rds: 'db.t3.small', multiAz: 'Yes', retention: '90d' },
    ],
    learned: [
      'Modular Terraform design \u2014 reusable modules with clear input/output contracts across environments',
      'Three-tier network architecture \u2014 public/private subnet isolation, NAT gateways, security group chaining',
      'CI/CD security \u2014 OIDC federation, SHA-pinned actions, no persisted credentials',
      'Supply chain hardening \u2014 provider pinning, lock files, Dependabot monitoring',
      'Database hardening \u2014 SSL enforcement, scram-sha-256, connection auditing, encrypted storage',
      'Environment parity \u2014 identical module code with per-environment configuration via tfvars',
    ],
  },
  {
    id: 'devsecops',
    title: 'DevSecOps Pipeline Reference',
    description:
      'A complete, reusable 11-stage security pipeline that scans for secrets, vulnerabilities, insecure code, and misconfigurations — gating deployment to AWS ECS Fargate via keyless OIDC.',
    language: 'Python',
    route: '/projects/devsecops',
    github: 'https://github.com/n1ops/devsecops-pipeline-reference',
    tech: [
      { name: 'GitHub Actions', color: '#2088ff' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'Terraform', color: '#7b42bc' },
      { name: 'Docker', color: '#2496ed' },
      { name: 'AWS ECS Fargate', color: '#ff9900' },
      { name: 'WAF', color: '#ff9900' },
      { name: 'OWASP ZAP', color: '#e8501e' },
      { name: 'Trivy', color: '#1904da' },
      { name: 'Gitleaks', color: '#b02e2e' },
      { name: 'Bandit', color: '#f7931e' },
      { name: 'CodeQL', color: '#6e40c9' },
      { name: 'Checkov', color: '#a855f7' },
      { name: 'Python', color: '#3776ab' },
      { name: 'IAM / OIDC', color: '#dd344c' },
    ],
    overview:
      'A production-grade DevSecOps reference that pairs a hardened FastAPI application (73 security tests, defense-in-depth middleware, JWT auth with lockout) with an 11-stage CI/CD security pipeline. Scans for leaked secrets, vulnerable dependencies, insecure code patterns, container CVEs, IaC misconfigurations, and live application vulnerabilities — then gates deployment behind a security gate. The pipeline is reusable: any repo can call it with a ~20-line workflow file. Deploys to AWS ECS Fargate via keyless OIDC.',
    architecture: [
      [{ label: 'git push / Pull Request', variant: '' }],
      [
        { label: '\u2460 Secret Detection (Gitleaks)', variant: '' },
        { label: '\u2461 SAST (Bandit + CodeQL)', variant: '' },
        { label: '\u2462 SCA (pip-audit)', variant: '' },
        { label: '\u2463 IaC Scan (Checkov)', variant: '' },
      ],
      [{ label: '\u2464 Unit Tests (pytest \u2014 73 tests)', variant: '' }],
      [
        { label: '\u2465 Container Scan (Trivy)', variant: '' },
        { label: '\u2466 SBOM (Syft)', variant: '' },
        { label: '\u2467 DAST (OWASP ZAP)', variant: '' },
      ],
      [{ label: '\u2468 Security Gate', variant: 'accent' }],
      [{ label: '\u2469 Deploy to ECS Fargate (OIDC)', variant: 'success' }],
    ],
    pipelineStages: [
      {
        name: 'Secret Detection (Gitleaks)',
        detail:
          'Scans the entire git history for leaked credentials, API keys, and tokens. Full fetch-depth: 0 catches secrets buried in history. CRITICAL gate — pipeline fails immediately on findings.',
      },
      {
        name: 'SAST (Bandit + CodeQL)',
        detail:
          'Two layers of static analysis: Bandit catches Python anti-patterns (hardcoded passwords, shell injection); CodeQL provides deep interprocedural data-flow analysis via the security-extended query suite.',
      },
      {
        name: 'SCA (pip-audit)',
        detail:
          'Scans all Python dependencies against the OSV and PyPI advisory databases for known CVEs in transitive dependencies. CRITICAL gate — pipeline fails on vulnerable packages.',
      },
      {
        name: 'IaC Scan (Checkov)',
        detail:
          'Scans all Terraform configurations against 750+ CIS/AWS best practice checks — missing encryption, overly permissive IAM, public S3, missing logging, and more.',
      },
      {
        name: 'Container Scan (Trivy)',
        detail:
          'Scans the Docker image for OS package CVEs and library vulnerabilities. Image is built once and saved as a tarball — never rebuilt, preserving provenance. CRITICAL gate on HIGH/CRITICAL CVEs.',
      },
      {
        name: 'DAST (OWASP ZAP)',
        detail:
          'Starts the live application and runs ZAP baseline scanning — automated crawling and passive/active probing for XSS, injection, information disclosure, and missing security headers.',
      },
    ],
    appSecurity: [
      'JWT auth with bcrypt hashing, iss/aud/jti claims, and JTI-based token revocation',
      'Account lockout after 5 failed attempts with 15-minute cooldown',
      'Timing-safe login — dummy bcrypt verify on non-existent users prevents enumeration',
      'Pure ASGI middleware stack — SecurityHeaders, RequestID, MaxBodySize, CORS, SlowAPI',
      '9 security headers on every response including errors (CSP, HSTS, X-Frame, COOP, CORP)',
      'Per-endpoint rate limiting — 3-30 req/min depending on sensitivity',
      'Row-level data isolation — IDOR returns 404 (not 403) to prevent ID enumeration',
      'Mass assignment protection — explicit allowlist of updatable fields',
      'Generic 500 handler — no stack traces, paths, or exception details leaked',
      '1MB body size limit via Content-Length check and streaming byte counter',
    ],
    infraSecurity: [
      'VPC with private subnets for ECS — no public IPs on containers',
      'WAFv2 with 3 AWS managed rule groups: CommonRuleSet, KnownBadInputs, SQLiRuleSet',
      'Non-root container with read-only filesystem and all Linux capabilities dropped',
      'ECR with immutable image tags and scan-on-push',
      'Secrets Manager with random_password — injected at runtime via ECS secrets',
      'KMS-encrypted CloudWatch logs with VPC Flow Logs',
      'CloudWatch Alarms for CPU >80%, Memory >80%, ALB 5xx >10 — wired to SNS',
      'OIDC federation — keyless GitHub Actions auth, deploy role scoped to main branch',
    ],
    testCoverage: {
      total: 73,
      categories: [
        { name: 'Authentication & Token Security', count: 34 },
        { name: 'Health, Middleware & Headers', count: 11 },
        { name: 'Rate Limiting', count: 9 },
        { name: 'CRUD, IDOR & Input Validation', count: 19 },
      ],
    },
    reusable:
      'The pipeline is parameterized and reusable. Any GitHub repository can call it by adding a ~20-line workflow file — just pass in language, runtime version, test command, and optional Docker/Terraform settings. Stages with empty inputs skip automatically. The security gate treats skipped stages as passing.',
    learned: [
      'DevSecOps pipeline design — 11-stage scanning with gate enforcement and SARIF integration',
      'Application hardening — JWT revocation, timing-safe auth, ASGI middleware, rate limiting',
      'Infrastructure as Code security — Checkov, WAFv2, KMS, private networking, OIDC federation',
      'Container security — non-root, read-only filesystem, capability dropping, image provenance',
      'DAST integration — running OWASP ZAP against a live application in CI/CD',
      'Reusable workflow design — parameterized pipelines with conditional stage execution',
    ],
  },
  {
    id: 'weather',
    title: 'AWS Lambda Discord Weather Bot',
    description:
      'A lightweight AWS Lambda function that sends a concise daily weather summary to a Discord channel using a webhook — no API keys required for weather data.',
    language: 'Python',
    route: '/projects/weather',
    github: 'https://github.com/n1ops/aws-lambda-discord-weather',
    tech: [
      { name: 'AWS Lambda', color: '#ff9900' },
      { name: 'EventBridge', color: '#e7157b' },
      { name: 'Open-Meteo', color: '#4aa3df' },
      { name: 'Discord Webhook', color: '#5865f2' },
      { name: 'Python', color: '#3776ab' },
    ],
    overview:
      'A lightweight AWS Lambda function that sends a concise daily weather summary to a Discord channel using a webhook. Scheduled via Amazon EventBridge, it fetches data from Open-Meteo (no API keys needed) and posts formatted summaries to Discord. Minimal maintenance, zero cost.',
    features: [
      'Completely serverless — AWS Lambda, zero infrastructure to maintain',
      'Scheduled daily execution via EventBridge cron',
      'Free weather data from Open-Meteo — no API keys required',
      'Current conditions and daily forecast in a clean Discord message',
      'Environment variable-based secret management',
      'Minimal codebase — single handler.py file',
    ],
    howItWorks: [
      { label: 'EventBridge (Schedule)', variant: 'accent' },
      { label: 'AWS Lambda', variant: '' },
      { label: 'Open-Meteo API', variant: '' },
      { label: 'Discord Webhook', variant: 'success' },
    ],
    exampleOutput: {
      title: 'Daily Weather',
      location: 'Herndon, VA',
      message: 'Now: 34\u00B0F, wind 5 mph \u2022 Today: Partly Cloudy \u2022 Low 28\u00B0F \u2022 High 42\u00B0F',
    },
  },
];
