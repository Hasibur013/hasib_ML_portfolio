import { useState } from "react";
import { profile, socials } from "../data/site";
import Icon from "./Icon";

export default function Contact() {
  const [status, setStatus] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = name ? `Portfolio message from ${name}` : "Portfolio enquiry";
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const gmail = new URL("https://mail.google.com/mail/");
    gmail.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: profile.email,
      su: subject,
      body,
    }).toString();
    const popup = window.open(gmail.toString(), "_blank", "noopener,noreferrer");
    setStatus(
      popup
        ? "Your message is ready in Gmail. Review it there, then press Send."
        : `The compose window was blocked. Email ${profile.email} directly.`
    );
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="mail" /> Contact
          </span>
          <h2 className="section-title">Let’s connect</h2>
          <p className="section-subtitle">Open to opportunities, collaborations, and interesting conversations</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Get in touch</h2>
            <ul className="contact-links">
              {socials.map((item) => (
                <li key={item.label}>
                  <a className="contact-link" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <span className="contact-link-icon">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <span>
                      <span className="contact-link-text">{item.label}</span>
                      <span className="contact-link-detail">{item.detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <form className="contact-form" onSubmit={onSubmit}>
            <p className="form-note">
              This form opens Gmail with your message pre-filled. Nothing is stored by this website, and you
              review the message before sending.
            </p>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                Name
              </label>
              <input className="form-input" id="contact-name" name="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                Email
              </label>
              <input
                className="form-input"
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="form-input form-textarea"
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or question..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Continue in Gmail
            </button>
            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
