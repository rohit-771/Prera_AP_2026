import { useState } from "react";
import { FaCalendarAlt, FaBriefcase, FaArrowRight, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import "./Connect-page.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const eventInitial = {
  organizerName: "", contactPerson: "", email: "", phone: "", organization: "",
  eventName: "", category: "", description: "", eventDate: "", location: "",
  expectedAudience: "", requirements: "", socialLinks: ""
};
const applicationInitial = {
  fullName: "", email: "", phone: "", institution: "", studyYear: "", role: "",
  applicationType: "", skills: "", experience: "", motivation: "",
  linkedinUrl: "", portfolioUrl: "", resumeUrl: ""
};

function Field({ label, name, value, onChange, required = false, type = "text", placeholder = "" }) {
  return <label className="prera-field">
    <span>{label}{required && <b> *</b>}</span>
    <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} />
  </label>;
}

function SelectField({ label, name, value, onChange, options }) {
  return <label className="prera-field">
    <span>{label} <b>*</b></span>
    <select name={name} value={value} onChange={onChange} required>
      <option value="">Select {label}</option>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>;
}

export default function ConnectPage() {
  const [activeForm, setActiveForm] = useState("");
  const [eventData, setEventData] = useState(eventInitial);
  const [applicationData, setApplicationData] = useState(applicationInitial);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const update = setter => event => setter(current => ({ ...current, [event.target.name]: event.target.value }));
  const changeForm = form => { setFeedback(null); setActiveForm(form); window.scrollTo({ top: 0, behavior: "smooth" }); };

  async function submitForm(event, formType) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    const isEvent = formType === "event";
    const payload = isEvent ? eventData : applicationData;
    try {
      const response = await fetch(`${API_BASE}/${isEvent ? "events" : "applications"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        const details = result.errors?.map(error => error.message).join(" ") || result.message || "Unable to submit. Please check your details.";
        throw new Error(details);
      }
      setFeedback({ type: "success", message: `${result.message} Reference ID: ${result.data.referenceId}` });
      if (isEvent) setEventData(eventInitial); else setApplicationData(applicationInitial);
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Server se connect nahi ho paya. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="prera-connect">
    <section className="connect-hero">
      <div className="connect-eyebrow">CONNECT WITH PRERA</div>
      <h1>Empowering <span>Events</span> &amp; Inspiring <span>Talent</span></h1>
      <p>Whether you represent a college fest, tech summit, or competition seeking strategic<br className="desktop-break" />
        sponsorships, or an ambitious student ready to build real impact — your journey with PRERA<br className="desktop-break" /> begins here.</p>

      {!activeForm ? <div className="connect-cards">
        <article className="connect-card">
          <div className="card-topline">
            <div className="card-icon gold"><FaCalendarAlt /></div>
            <span>FOR ORGANIZERS &amp; CLUBS</span>
          </div>
          <h2>Host an Event / Event Collaboration</h2>
          <p>Are you organizing a college fest, tech event, cultural festival, competition, or corporate event? Connect with PRERA for sponsorships, brand partnerships, and event collaborations.</p>
          <ul>
            <li><FaCheckCircle /> Direct Brand &amp; Sponsor Sourcing</li>
            <li><FaCheckCircle /> End-to-End Enablement &amp; Strategy</li>
            <li><FaCheckCircle /> Nationwide Campus Reach</li>
          </ul>
          <button className="connect-primary" onClick={() => changeForm("event")}>Submit Event Details <FaArrowRight /></button>
        </article>
        <article className="connect-card">
          <div className="card-topline">
            <div className="card-icon"><FaBriefcase /></div>
            <span>CAREERS &amp; OPPORTUNITIES</span>
          </div>
          <h2>Join PRERA / Work With Us</h2>
          <p>Want to work with PRERA? Whether you are a student, fresher, or experienced professional, explore opportunities to become part of our growing team.</p>
          <ul>
            <li><FaCheckCircle /> Real-World High Impact Projects</li>
            <li><FaCheckCircle /> Industry Networking with Top Brands</li>
            <li><FaCheckCircle /> Flexible Internships &amp; Full-time Roles</li>
          </ul>
          <button className="connect-secondary" onClick={() => changeForm("application")}>Explore Opportunities <FaArrowRight /></button>
        </article>
      </div> : <section className="connect-form-panel">
        <button className="connect-back" type="button" onClick={() => changeForm("")}><FaArrowLeft /> Back to options</button>
        <div className="form-heading">
          <span>{activeForm === "event" ? "EVENT COLLABORATION" : "CAREERS & OPPORTUNITIES"}</span>
          <h2>{activeForm === "event" ? "Tell us about your event" : "Become a part of PRERA"}</h2>
          <p>{activeForm === "event" ? "Share your event details and our partnerships team will get in touch." : "Tell us about yourself, your skills and the role you are interested in."}</p>
        </div>
        {feedback && <div className={`form-feedback ${feedback.type}`} role="status">{feedback.message}</div>}
        {activeForm === "event" ? <form className="prera-form-grid" onSubmit={event => submitForm(event, "event")}>
          <Field label="Organizer / Club Name" name="organizerName" value={eventData.organizerName} onChange={update(setEventData)} required />
          <Field label="Contact Person" name="contactPerson" value={eventData.contactPerson} onChange={update(setEventData)} required />
          <Field label="Email Address" name="email" type="email" value={eventData.email} onChange={update(setEventData)} required />
          <Field label="Phone Number" name="phone" type="tel" value={eventData.phone} onChange={update(setEventData)} required />
          <Field label="College / University / Company" name="organization" value={eventData.organization} onChange={update(setEventData)} required />
          <Field label="Event Name" name="eventName" value={eventData.eventName} onChange={update(setEventData)} required />
          <SelectField label="Event Category" name="category" value={eventData.category} onChange={update(setEventData)} options={["Technical", "Cultural", "Sports", "Business", "Educational", "Other"]} />
          <Field label="Event Date" name="eventDate" type="date" value={eventData.eventDate} onChange={update(setEventData)} required />
          <Field label="Event Location" name="location" value={eventData.location} onChange={update(setEventData)} required />
          <Field label="Expected Audience / Footfall" name="expectedAudience" value={eventData.expectedAudience} onChange={update(setEventData)} required placeholder="e.g. 2,000+" />
          <label className="prera-field full"><span>Event Description <b>*</b></span><textarea name="description" value={eventData.description} onChange={update(setEventData)} required minLength="10" maxLength="3000" rows="4" placeholder="Tell us about your event..." /></label>
          <label className="prera-field full"><span>Sponsorship / Collaboration Requirements <b>*</b></span><textarea name="requirements" value={eventData.requirements} onChange={update(setEventData)} required minLength="5" maxLength="3000" rows="4" placeholder="What kind of support or collaboration are you looking for?" /></label>
          <Field label="Social Media / Event Link (optional)" name="socialLinks" value={eventData.socialLinks} onChange={update(setEventData)} />
          <div className="prera-submit-row"><button className="connect-primary" disabled={submitting}>{submitting ? "Submitting..." : "Submit Event Proposal"} <FaArrowRight /></button></div>
        </form> : <form className="prera-form-grid" onSubmit={event => submitForm(event, "application")}>
          <Field label="Full Name" name="fullName" value={applicationData.fullName} onChange={update(setApplicationData)} required />
          <Field label="Email Address" name="email" type="email" value={applicationData.email} onChange={update(setApplicationData)} required />
          <Field label="Phone Number" name="phone" type="tel" value={applicationData.phone} onChange={update(setApplicationData)} required />
          <Field label="College / University / Organization" name="institution" value={applicationData.institution} onChange={update(setApplicationData)} required />
          <Field label="Current Study Year (optional)" name="studyYear" value={applicationData.studyYear} onChange={update(setApplicationData)} placeholder="e.g. 2nd Year" />
          <SelectField label="Role Applying For" name="role" value={applicationData.role} onChange={update(setApplicationData)} options={["Business Development", "Marketing", "Event Management", "Sponsorship & Partnerships", "Social Media Management", "Graphic Design", "Content Writing", "Web Development", "Operations", "Volunteer", "Other"]} />
          <SelectField label="Application Type" name="applicationType" value={applicationData.applicationType} onChange={update(setApplicationData)} options={["Internship", "Part-time", "Full-time", "Volunteer", "Freelance"]} />
          <label className="prera-field full"><span>Skills <b>*</b></span><textarea name="skills" value={applicationData.skills} onChange={update(setApplicationData)} required minLength="2" rows="3" placeholder="Mention your skills, tools and strengths..." /></label>
          <label className="prera-field full"><span>Experience (optional)</span><textarea name="experience" value={applicationData.experience} onChange={update(setApplicationData)} rows="3" placeholder="Projects, internships, volunteering or relevant experience..." /></label>
          <label className="prera-field full"><span>Why do you want to join PRERA? <b>*</b></span><textarea name="motivation" value={applicationData.motivation} onChange={update(setApplicationData)} required minLength="10" rows="4" placeholder="Tell us what motivates you..." /></label>
          <Field label="LinkedIn URL (optional)" name="linkedinUrl" value={applicationData.linkedinUrl} onChange={update(setApplicationData)} />
          <Field label="Portfolio URL (optional)" name="portfolioUrl" value={applicationData.portfolioUrl} onChange={update(setApplicationData)} />
          <Field label="Resume URL (optional)" name="resumeUrl" value={applicationData.resumeUrl} onChange={update(setApplicationData)} />
          <div className="prera-submit-row"><button className="connect-primary" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"} <FaArrowRight /></button></div>
        </form>}
      </section>}
    </section>
    <section className="connect-contact">
      <h2>GET IN TOUCH</h2>
      <p>Have a question? Reach out to our team at <a href="mailto:team.prera@gmail.com">team.prera@gmail.com</a></p>
    </section>
  </main>;
}
