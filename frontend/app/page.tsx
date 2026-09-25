"use client";

import { useEffect, useState } from "react";

type Course = { id: number; name: string; category: string; duration_hours: number; status: string };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [apiStatus, setApiStatus] = useState("Checking API");

  useEffect(() => {
    fetch(`${apiUrl}/api/courses`)
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        setApiStatus("Live");
      })
      .catch(() => setApiStatus("Offline"));
  }, []);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">R</span><span>roadwise</span></div>
        <div className="workspace-label">Operations</div>
        <nav>
          <a className="nav-item active" href="#overview"><span>◈</span> Overview</a>
          <a className="nav-item" href="#students"><span>◌</span> Students <b>24</b></a>
          <a className="nav-item" href="#schedule"><span>◷</span> Schedule</a>
          <a className="nav-item" href="#instructors"><span>♙</span> Instructors</a>
          <a className="nav-item" href="#courses"><span>▣</span> Courses</a>
        </nav>
        <div className="sidebar-footer"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><small>Administrator</small></div><span>•••</span></div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> Overview</div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧</button><div className="date-pill">September 25, 2026 <span>⌄</span></div></div></header>
        <div className="page-heading"><div><p className="eyebrow">Friday, September 25, 2026</p><h1>Good morning, Alex.</h1><p className="subheading">Here&apos;s what&apos;s happening across your school today.</p></div><button className="primary-button">+ Add student</button></div>

        <div className="stats-grid">
          <article className="stat-card"><div className="stat-top"><span>Active students</span><span className="stat-icon mint">◌</span></div><strong>24</strong><small className="positive">↗ 12.5% <em>vs last month</em></small></article>
          <article className="stat-card"><div className="stat-top"><span>Lessons today</span><span className="stat-icon peach">◷</span></div><strong>18</strong><small className="neutral">6 remaining <em>of 24 scheduled</em></small></article>
          <article className="stat-card"><div className="stat-top"><span>Hours this month</span><span className="stat-icon blue">◒</span></div><strong>186.5</strong><small className="positive">↗ 8.2% <em>vs last month</em></small></article>
          <article className="stat-card"><div className="stat-top"><span>Completion rate</span><span className="stat-icon yellow">✦</span></div><strong>87.4%</strong><small className="positive">↗ 3.1% <em>vs last month</em></small></article>
        </div>

        <div className="section-grid"><section className="panel schedule-panel"><div className="panel-heading"><div><h2>Today&apos;s schedule</h2><p>Friday, September 25</p></div><button className="text-button">View calendar →</button></div><div className="schedule-list"><Schedule time="09:00" name="Liam Johnson" detail="Practical lesson · B Licence" color="mint" /><Schedule time="10:30" name="Maya Patel" detail="Theory class · Module 4" color="peach" /><Schedule time="13:00" name="Noah Williams" detail="Practical lesson · B Licence" color="blue" /></div></section><section className="panel progress-panel"><div className="panel-heading"><div><h2>Course overview</h2><p>Enrollment by category</p></div><span className="live-dot">● {apiStatus}</span></div>{courses.length ? courses.map((course) => <div className="course-row" key={course.id}><div className="course-title"><span>{course.category}</span><strong>{course.name}</strong></div><div className="progress-track"><i style={{ width: `${Math.min(course.duration_hours * 2, 100)}%` }} /></div><small>{course.duration_hours} hrs</small></div>) : <div className="loading">Loading courses...</div>}<button className="outline-button">Manage courses</button></section></div>
      </section>
    </main>
  );
}

function Schedule({ time, name, detail, color }: { time: string; name: string; detail: string; color: string }) {
  return <div className="schedule-row"><time>{time}</time><span className={`timeline-dot ${color}`} /><div><strong>{name}</strong><p>{detail}</p></div><button className="more-button" aria-label={`More options for ${name}`}>•••</button></div>;
}
