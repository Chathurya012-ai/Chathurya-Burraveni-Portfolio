const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
const BASE = process.env.PORTFOLIO_URL || "http://127.0.0.1:5500";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const request = client.get(
      url,
      {
        timeout: 20000,
        headers: { "user-agent": "Mozilla/5.0 portfolio-test" },
      },
      (response) => {
        const location = response.headers.location;
        if (location && response.statusCode >= 300 && response.statusCode < 400 && redirects < 5) {
          response.resume();
          const next = new URL(location, url).toString();
          get(next, redirects + 1).then(resolve, reject);
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          resolve({
            status: response.statusCode,
            headers: response.headers,
            body: Buffer.concat(chunks),
          });
        });
      }
    );
    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy(new Error(`Timeout fetching ${url}`));
    });
  });
}

function section(html, id) {
  const start = html.indexOf(`id="${id}"`);
  assert.ok(start > -1, `Missing section #${id}`);
  const next = html.indexOf("<section", start + 1);
  return html.slice(start, next === -1 ? html.length : next);
}

function companiesInOrder(html) {
  return [...html.matchAll(/<p class="company">([^<]+)<\/p>/g)].map((match) => match[1]);
}

describe("portfolio files exist", () => {
  for (const file of ["index.html", "style.css", "script.js", "My_resume.pdf", "profile.jpeg", ".nojekyll"]) {
    it(`includes ${file}`, () => {
      assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} is missing`);
    });
  }
});

describe("resume download", () => {
  const html = read("index.html");

  it("points resume buttons at My_resume.pdf with a download filename", () => {
    const resumeLinks = [...html.matchAll(/href="([^"]+)"[^>]*download="([^"]+)"/g)];
    assert.ok(resumeLinks.length >= 3, "Expected header, hero, and contact resume downloads");
    for (const [, href, filename] of resumeLinks) {
      assert.equal(href, "My_resume.pdf");
      assert.equal(filename, "Chathurya_Burraveni_Resume.pdf");
    }
  });

  it("serves a real PDF, not an HTML error page", async () => {
    const pdf = fs.readFileSync(path.join(ROOT, "My_resume.pdf"));
    assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
    assert.ok(pdf.length > 20000, "Resume PDF looks too small");

    const response = await get(`${BASE}/My_resume.pdf`);
    assert.equal(response.status, 200);
    assert.match(String(response.headers["content-type"] || ""), /pdf/i);
    assert.equal(response.body.subarray(0, 4).toString(), "%PDF");
  });
});

describe("hero, identity, and contact", () => {
  const html = read("index.html");

  it("uses the Software Developer positioning and requested headline", () => {
    assert.match(html, /<title>Chathurya Burraveni \| Software Developer<\/title>/);
    assert.match(html, /<h1>Chathurya Burraveni<\/h1>/);
    assert.match(html, />Software Developer</);
    assert.match(
      html,
      /Python Automation \| Java &amp; Spring Boot \| Backend APIs \| AI &amp; MCP Integrations/
    );
    assert.match(html, /specializing in Python automation, Java\/Spring Boot backend engineering/);
  });

  it("includes the five hero actions", () => {
    const hero = section(html, "home");
    assert.match(hero, /href="#projects">View Projects</);
    assert.match(hero, /Download Resume/);
    assert.match(hero, /href="https:\/\/www\.linkedin\.com\/in\/chathurya-burraveni-a903b9179\/"[^>]*>LinkedIn</);
    assert.match(hero, /href="https:\/\/github\.com\/Chathurya012-ai"[^>]*>GitHub</);
    assert.match(hero, /href="#contact">Contact Me</);
  });

  it("does not show a residential address or fake contact form", () => {
    assert.doesNotMatch(html, /Overland Park|Kansas|residential|123 /i);
    assert.doesNotMatch(html, /contact-form|messages were sent|Your contact info will appear here/i);
  });

  it("has working mailto, tel, LinkedIn, GitHub, and portfolio contact actions", () => {
    const contact = section(html, "contact");
    assert.match(contact, /href="mailto:bchathurya78@gmail.com"/);
    assert.match(contact, /href="tel:\+18508160994"/);
    assert.match(contact, /\(850\) 816-0994/);
    assert.match(contact, /href="https:\/\/www\.linkedin\.com\/in\/chathurya-burraveni-a903b9179\/"/);
    assert.match(contact, /href="https:\/\/github\.com\/Chathurya012-ai"/);
    assert.match(contact, /href="https:\/\/chathurya012-ai\.github\.io\/Chathurya-Burraveni-Portfolio\/"/);
  });
});

describe("experience", () => {
  const html = read("index.html");
  const experience = section(html, "experience");
  const order = companiesInOrder(experience);

  it("lists the five employers in reverse chronological order", () => {
    assert.deepEqual(order, [
      "Insight Global | Client: T-Mobile",
      "American IT Solutions, Inc.",
      "Intelligenie LLC | Client: Dell Technologies",
      "Tata Consultancy Services",
      "BrownFrame Technologies",
    ]);
  });

  it("uses the approved titles and dates", () => {
    assert.match(experience, /Python Developer \/ Software Developer — WAF Security Automation/);
    assert.match(experience, /October 2025<\/time> – Present/);
    assert.match(experience, /August 2025<\/time> – <time datetime="2025-10">October 2025/);
    assert.match(experience, /October 2024<\/time> – <time datetime="2025-07">July 2025/);
    assert.match(experience, /July 2021<\/time> – <time datetime="2023-01">January 2023/);
    assert.match(experience, /December 2019<\/time> – <time datetime="2021-06">June 2021/);
  });

  it("keeps verified metrics and does not invent Change Request deployment", () => {
    assert.match(experience, /849 Akamai properties/);
    assert.match(experience, /70\+ properties/);
    assert.match(experience, /6,000–6,500 domains/);
    assert.match(experience, /reducing backend latency by 23%/);
    assert.match(experience, /500 ms to 120 ms/);
    assert.match(experience, /deployment efficiency by 65%/);
    assert.match(experience, /improving application performance by 40%/);
    assert.match(experience, /82% test coverage/);
    assert.match(experience, /five minutes to under one minute/);
    assert.match(experience, /reducing sprint delivery time by 40%/);
    assert.match(experience, /evaluated requirements for future automation/);
    assert.doesNotMatch(html, /full Change Request automation was deployed/i);
    assert.doesNotMatch(html, /LME Services/);
  });

  it("does not use unsupported years-of-experience claims", () => {
    assert.doesNotMatch(html, /4\+ years|over 4 years|5\+ years of experience/i);
  });
});

describe("skills, projects, education, certifications", () => {
  const html = read("index.html");

  it("groups the requested skills and omits unconfirmed C# and Kubernetes", () => {
    const skills = section(html, "skills");
    for (const skill of [
      "Python",
      "Java",
      "Spring Boot",
      "GraphQL",
      "MCP Integrations",
      "Microsoft Graph",
      "ServiceNow",
      "Akamai WAF",
      "AWS",
      "PostgreSQL",
      "React",
      "PyTest",
    ]) {
      assert.match(skills, new RegExp(`>${skill}<`));
    }
    assert.doesNotMatch(skills, />C#</);
    assert.doesNotMatch(skills, /Kubernetes/);
  });

  it("includes verified projects without invented GitHub links", () => {
    const projects = section(html, "projects");
    for (const name of [
      "Akamai SiteShield Inventory Automation",
      "External Domain Risk Analysis Dashboard",
      "IP Allowlisting Automation",
      "ServiceNow MCP Agent Integration",
      "Speech Emotion Recognition",
      "Real-Time Face Mask Detection",
    ]) {
      assert.match(projects, new RegExp(name));
    }
    assert.match(projects, /86% accuracy/);
    assert.match(projects, /95% accuracy/);
    assert.match(projects, /href="https:\/\/github\.com\/Chathurya012-ai\/TalkMate"/);
    assert.equal((projects.match(/View on GitHub/g) || []).length, 1);
  });

  it("shows the requested education and certifications", () => {
    const education = section(html, "education");
    assert.match(education, /Master’s Degree in Computer Science/);
    assert.match(education, /University of Central Missouri/);
    assert.match(education, /August 2024/);
    assert.match(education, /Bachelor’s Degree in Information Technology/);
    assert.match(education, /Sreenidhi Institute of Science and Technology/);
    assert.match(education, /June 2021/);
    assert.match(education, /AWS Certified Cloud Practitioner/);
    assert.match(education, /Elite Silver, 87%/);
    assert.match(education, /Python Basics/);
    assert.match(education, /TCS Career Edge — Knockdown the Lockdown/);
  });
});

describe("accessibility, SEO, and GitHub Pages paths", () => {
  const html = read("index.html");
  const css = read("style.css");

  it("uses semantic landmarks, skip link, and heading order", () => {
    assert.match(html, /<a class="skip-link" href="#main">Skip to main content<\/a>/);
    assert.match(html, /<main id="main">/);
    assert.match(html, /aria-label="Primary"/);
    assert.match(html, /<h1>Chathurya Burraveni<\/h1>/);
    assert.ok((html.match(/<h1>/g) || []).length === 1);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /:focus-visible/);
  });

  it("includes SEO and Open Graph metadata", () => {
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<meta property="og:title"/);
    assert.match(html, /<meta property="og:url" content="https:\/\/chathurya012-ai\.github\.io\/Chathurya-Burraveni-Portfolio\/"/);
  });

  it("uses relative asset paths compatible with GitHub Pages project URLs", () => {
    assert.match(html, /href="style.css"/);
    assert.match(html, /src="script.js"/);
    assert.match(html, /src="profile.jpeg"/);
    assert.match(html, /href="My_resume.pdf"/);
    assert.doesNotMatch(html, /href="\/style.css"|src="\/script.js"/);
  });
});

describe("local preview server", () => {
  let home;

  before(async () => {
    home = await get(`${BASE}/`);
  });

  it("serves the homepage and static assets", async () => {
    assert.equal(home.status, 200);
    const page = home.body.toString("utf8");
    assert.match(page, /Chathurya Burraveni/);

    for (const asset of ["/style.css", "/script.js", "/profile.jpeg", "/My_resume.pdf"]) {
      const response = await get(`${BASE}${asset}`);
      assert.equal(response.status, 200, `${asset} did not return 200`);
    }
  });

  it("contains in-page section anchors used by navigation", () => {
    const page = home.body.toString("utf8");
    for (const id of ["home", "about", "experience", "skills", "projects", "education", "contact"]) {
      assert.match(page, new RegExp(`id="${id}"`));
      assert.match(page, new RegExp(`href="#${id}"`));
    }
  });
});

describe("external links", () => {
  it("LinkedIn, GitHub, TalkMate, and the live portfolio URL respond", async () => {
    const urls = [
      "https://github.com/Chathurya012-ai",
      "https://github.com/Chathurya012-ai/TalkMate",
      "https://www.linkedin.com/in/chathurya-burraveni-a903b9179/",
      "https://chathurya012-ai.github.io/Chathurya-Burraveni-Portfolio/",
    ];

    for (const url of urls) {
      const response = await get(url);
      const linkedInBotBlock = url.includes("linkedin.com") && response.status === 999;
      assert.ok(
        (response.status >= 200 && response.status < 400) || linkedInBotBlock,
        `${url} returned ${response.status}`
      );
    }
  });
});
