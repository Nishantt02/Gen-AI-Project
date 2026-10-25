import { useContext, useState } from "react";
import "../style/Interview.scss";
import { useInterview } from "../hooks/UserInterview.js";



/* ---------- Small inline icons (no extra dependency) ---------- */
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 6 2 12 8 18" />
    <polyline points="16 6 22 12 16 18" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions", Icon: CodeIcon },
  { id: "behavioral", label: "Behavioral Questions", Icon: ChatIcon },
  { id: "roadmap", label: "Road Map", Icon: SendIcon },
];

/* ---------- Sub components ---------- */
const QuestionList = ({ items }) => {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div className="interview__questions">
      {items.map((item, index) => {
        const isOpen = openQuestion === index;
        const answer = item.answers ?? item.answer;
        const answerId = `question-answer-${index}`;

        return (
          <article
            className={`question-card ${isOpen ? "question-card--open" : ""}`}
            key={`${item.question}-${index}`}
          >
            <h3 className="question-card__heading">
              <button
                className="question-card__toggle"
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenQuestion(isOpen ? null : index)}
              >
                <span className="question-card__number">
                  Q{String(index + 1).padStart(2, "0")}
                </span>
                <span className="question-card__title">{item.question}</span>
                <svg
                  className="question-card__chevron"
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div className="question-card__details" id={answerId}>
                {item.intention && (
                  <div className="question-card__section">
                    <span className="question-card__tag question-card__tag--intention">
                      Intention
                    </span>
                    <p>{item.intention}</p>
                  </div>
                )}
                {answer && (
                  <div className="question-card__section">
                    <span className="question-card__tag question-card__tag--answer">
                      Model answer
                    </span>
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

const RoadMap = ({ plan }) => (
  <ol className="timeline">
    {plan.map((item) => (
      <li className="timeline__item" key={item.day}>
        <span className="timeline__dot" aria-hidden="true" />
        <div className="timeline__head">
          <span className="timeline__day">Day {item.day}</span>
          <h3 className="timeline__focus">{item.focus}</h3>
        </div>
        <ul className="timeline__tasks">
          {(Array.isArray(item.tasks) ? item.tasks : [item.tasks]).map(
            (task, i) => (
              <li key={i}>{task}</li>
            ),
          )}
        </ul>
      </li>
    ))}
  </ol>
);

const ScoreRing = ({ score }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div className="score-ring" role="img" aria-label={`Match score ${score} percent`}>
      <svg viewBox="0 0 110 110" className="score-ring__svg">
        <circle className="score-ring__track" cx="55" cy="55" r={radius} />
        <circle
          className="score-ring__value"
          cx="55"
          cy="55"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring__text">
        <strong>{score}</strong>
        <span>%</span>
      </div>
    </div>
  );
};

/* ---------- Main component ---------- */
function Interview() 
{
  const [activeSection, setActiveSection] = useState("roadmap");
  const{report,loading}=useInterview();

  
  if (!report) {
    return (
      <main className="interview__content">
        <p>{loading ? "Loading interview report…" : "Interview report is not available. Generate a report first."}</p>
      </main>
    );
  }

  const parsedMatchScore = Number(report.matchScore);
  const matchScore = Number.isFinite(parsedMatchScore) ? parsedMatchScore : 0;
  const matchLabel = report.matchLabel ?? (
    matchScore >= 80 ? "Strong match for this role" :
    matchScore >= 60 ? "Good potential for this role" :
    "Areas to improve for this role"
  );

  const {
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
  } = report;
  const roadMap = report.preparationPlan ?? report.roadMap ?? [];
  const normalizedSkillGaps = skillGaps.map((gap) => ({
    ...gap,
    skill: gap.skills ?? gap.skill,
  }));

  const titles = {
    technical: { title: "Technical Questions" },
    behavioral: { title: "Behavioral Questions" },
    roadmap: { title: "Preparation Road Map", badge: `${roadMap.length}-day plan` },
  };

  return (
    <div className="interview">
      <div className="interview__layout">
        {/* Left: sections */}
        <aside className="interview__nav">
          <p className="interview__nav-title">Sections</p>
          <nav>
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`nav-item ${activeSection === id ? "nav-item--active" : ""}`}
                onClick={() => setActiveSection(id)}
                aria-current={activeSection === id ? "page" : undefined}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Center: content */}
        <main className="interview__content">
          <header className="interview__header">
            <h2>{titles[activeSection].title}</h2>
            {titles[activeSection].badge && (
              <span className="interview__badge">{titles[activeSection].badge}</span>
            )}
          </header>

          {activeSection === "technical" && <QuestionList items={technicalQuestions} />}
          {activeSection === "behavioral" && <QuestionList items={behavioralQuestions} />}
          {activeSection === "roadmap" && <RoadMap plan={roadMap} />}
        </main>

        {/* Right: score + skill gaps */}
        <aside className="interview__side">
          <section className="side-block">
            <p className="side-block__title">Match score</p>
            <ScoreRing score={matchScore} />
            <p className="side-block__caption">{matchLabel}</p>
          </section>

          <section className="side-block side-block--gaps">
            <p className="side-block__title">Skill gaps</p>
            <ul className="gaps">
              {normalizedSkillGaps.map((gap, index) => (
                <li key={index} className={`gap gap--${gap.severity}`}>
                  {gap.skill}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Interview;
