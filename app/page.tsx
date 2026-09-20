"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "inicio", label: "La invitación" },
  { id: "recuerdos", label: "Mi historia" },
  { id: "celebracion", label: "La celebración" },
  { id: "detalles", label: "Los detalles" },
  { id: "asistencia", label: "Nos vemos" },
];
const photos = [4, 3, 8, 2, 5, 6, 7, 9, 1];
const maps =
  "https://www.google.com/maps/place/Castilla+Gourmet+Eventos/@4.6373098,-74.1445317,891m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9d9f733179b1:0x9a4d3dadcc96ca9!8m2!3d4.6373045!4d-74.1419568!16s%2Fg%2F11h4y5hm2d?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D";
const song = "https://www.youtube.com/watch?v=3PuMsRrjvRc";
const rsvp = "https://wa.me/573125454520?text=" + encodeURIComponent("¡Hola! Quiero confirmar mi asistencia a los quince años de María Paula el 17 de octubre de 2026. Mi nombre es: ");
function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <span />✧<span />
    </div>
  );
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Invitation() {
  const [active, setActive] = useState("inicio");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const update = () => {
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      setDays(
        Math.max(
          0,
          Math.round(
            (Date.UTC(2026, 9, 17) - new Date(today + "T00:00:00Z").getTime()) /
              86400000,
          ),
        ),
      );
    };
    update();
    const timer = setInterval(update, 60000);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
    );
    document
      .querySelectorAll("main > section")
      .forEach((el) => observer.observe(el));
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
  }, [selected]);
  function closePhoto() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(
        "Castilla Gourmet, tercer piso, Cra. 78 # 7D-30, Bogotá",
      );
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  function calendar() {
    const data = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Maria Paula//Mis quince//ES",
      "BEGIN:VEVENT",
      "UID:maria-paula-xv-20261017@invitacion.local",
      "DTSTAMP:20260920T000000Z",
      "DTSTART:20261018T010000Z",
      "SUMMARY:Quince años de María Paula",
      "LOCATION:Castilla Gourmet\\, tercer piso\\, Cra. 78 # 7D-30\\, Bogotá",
      "DESCRIPTION:Inicio: 8:00 p.m. (Bogotá). Parqueadero frente al lugar.",
      " Vestuario elegante. Azul y negro reservados para la quinceañera.",
      " Lluvia de sobres. Confirmar al +57 3125454520 hasta el 10 de octubre.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([data], { type: "text/calendar;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "maria-paula-17-octubre.ics";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <a className="skip-link" href="#celebracion">
        Ir a la información del evento
      </a>
      <header className="header">
        <a className="monogram" href="#inicio" aria-label="María Paula, inicio">
          MP<span>XV</span>
        </a>
        <a className="header-date" href="#celebracion">
          17 · 10 · 2026
        </a>
        <a className="header-link" href="#asistencia">
          Acompáñame <Arrow />
        </a>
      </header>
      <nav className="chapter-nav" aria-label="Capítulos de la invitación">
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={"#" + c.id}
            aria-label={c.label}
            aria-current={active === c.id ? "location" : undefined}
          >
            <span className="nav-label">{c.label}</span>
            <span className="nav-number">0{i + 1}</span>
          </a>
        ))}
      </nav>
      <main>
        <section id="inicio" className="scene hero">
          <div className="garden" aria-hidden="true" />
          <div className="stars" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">BAJO LA LUNA, COMIENZA UN NUEVO CAPÍTULO</p>
            <h1>María Paula</h1>
            <div className="xv-line">
              <span />
              MIS QUINCE AÑOS
              <span />
            </div>
            <p className="hero-quote">
              Hay noches que se sueñan.
              <br />Y otras que se recuerdan para siempre.
            </p>
            <div className="date-display">
              <span>SÁBADO</span>
              <strong>17</strong>
              <span>
                OCTUBRE
                <br />
                2026
              </span>
            </div>
            <a className="button light" href="#recuerdos">
              Descubre mi invitación <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-bottom">
            <span>BOGOTÁ, COLOMBIA</span>
            <a href="#recuerdos">
              DESLIZA Y DÉJATE LLEVAR <span>↓</span>
            </a>
            <span>UNA NOCHE PARA SOÑAR</span>
          </div>
        </section>
        <section id="recuerdos" className="scene memories">
          <div className="section-heading">
            <p className="eyebrow">01 / LOS RECUERDOS QUE ME ACOMPAÑAN</p>
            <h2>
              Todo empieza con <em>un sueño</em>
            </h2>
            <p>
              Pequeños instantes, grandes sonrisas y una historia
              <br className="desktop-break" /> que hoy está a punto de vivir un
              nuevo capítulo.
            </p>
          </div>
          <div className="collage">
            {photos.map((id, i) => (
              <button
                key={id}
                className={"photo photo-" + i}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setSelected(i);
                }}
                aria-label={"Ampliar recuerdo de María Paula " + (i + 1)}
              >
                <img
                  src={"/photos/recuerdo-" + id + ".webp"}
                  alt={"María Paula en un recuerdo de su infancia " + (i + 1)}
                  loading="lazy"
                  width={720}
                  height={900}
                />
                <span aria-hidden="true">✧</span>
              </button>
            ))}
            <div className="collage-note">
              Siempre la misma ilusión.
              <br />
              <span>Ahora, un sueño más grande.</span>
            </div>
          </div>
          <p className="gallery-hint">
            CADA FOTO, UN RECUERDO · TOCA PARA VERLO DE CERCA
          </p>
          <Flourish />
          <blockquote>
            Quiero compartir contigo la alegría de crecer,
            <br />
            los sueños que vienen y la magia de esta noche.
          </blockquote>
          <a href="#celebracion" className="text-link">
            El siguiente capítulo <span aria-hidden="true">↓</span>
          </a>
        </section>
        <section id="celebracion" className="scene celebration">
          <div className="celebration-art" aria-hidden="true">
            <div className="orbit" />
            <span className="big-xv">XV</span>
            <span className="art-caption">
              DIECISIETE DE OCTUBRE
              <br />
              DOS MIL VEINTISÉIS
            </span>
          </div>
          <div className="event-content">
            <p className="eyebrow">02 / RESERVA ESTA NOCHE</p>
            <h2>
              Una cita con
              <br />
              <em>la luna</em>
            </h2>
            <p className="event-intro">
              La noche será aún más especial
              <br />
              si la comparto contigo.
            </p>
            <div className="event-row">
              <span className="detail-label">CUÁNDO</span>
              <div>
                <h3>Sábado, 17 de octubre</h3>
                <p>2026 · 8:00 p.m.</p>
              </div>
            </div>
            <div className="event-row">
              <span className="detail-label">DÓNDE</span>
              <div>
                <h3>Castilla Gourmet</h3>
                <p>Tercer piso</p>
                <p>Cra. 78 # 7D-30 · Bogotá</p>
              </div>
            </div>
            <div className="event-row">
              <span className="detail-label">AL LLEGAR</span>
              <div><h3>Parqueadero</h3><p>Hay parqueadero frente al lugar.</p></div>
            </div>
            <div className="event-actions">
              <a
                className="button light"
                href={maps}
                target="_blank"
                rel="noreferrer"
              >
                Cómo llegar <Arrow />
              </a>
              <button className="text-link" onClick={calendar}>
                Guardar la fecha <span aria-hidden="true">＋</span>
              </button>
            </div>
            <button className="copy-address" onClick={copyAddress}>
              {copied ? "Dirección copiada ✓" : "Copiar dirección"}
            </button>
            <span className="sr-only" role="status">
              {copied ? "Dirección copiada" : ""}
            </span>
            {copyError && (
              <p role="alert" className="small-note">
                Puedes copiarla manualmente: Cra. 78 # 7D-30, Bogotá.
              </p>
            )}
            <div className="countdown">
              <span className="count-number">{days === null ? "—" : days}</span>
              <div>
                <span className="eyebrow">
                  {days === 0 ? "EL DÍA HA LLEGADO" : "DÍAS PARA LA FECHA"}
                </span>
                <p>Un recuerdo inolvidable nos espera.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="detalles" className="scene details">
          <p className="eyebrow">03 / LOS PEQUEÑOS DETALLES</p>
          <h2>
            Una noche para <em>brillar</em>
          </h2>
          <div className="details-grid">
            <article>
              <div className="detail-icon" aria-hidden="true">
                ✧
              </div>
              <p className="eyebrow">CÓDIGO DE VESTUARIO</p>
              <h3>Elegante</h3>
              <p>
                Ven con tu mejor versión para
                <br />
                celebrar una noche especial.
              </p>
              <div className="swatches" aria-hidden="true">
                <span />
                <span />
              </div>
              <p className="small-note">
                Los colores azul y negro están
                <br />
                <strong>reservados para la quinceañera.</strong>
              </p>
            </article>
            <div className="detail-divider" />
            <article>
              <div className="envelope" aria-hidden="true">
                ♡
              </div>
              <p className="eyebrow">CON MUCHO CARIÑO</p>
              <h3>Lluvia de sobres</h3>
              <p>
                Tu compañía es el regalo más especial.
                <br />
                Si deseas tener un detalle conmigo,
                <br />
                agradeceré tu lluvia de sobres.
              </p>
              <Flourish />
              <p className="small-note">Gracias por ser parte de este sueño.</p>
            </article>
          </div>
          <div className="song-card">
            <span className="music-icon" aria-hidden="true">
              ♫
            </span>
            <div>
              <span className="eyebrow">LA MELODÍA DE ESTA HISTORIA</span>
              <p>
                Vals de amor <span>— Joan Sebastian</span>
              </p>
            </div>
            <a
              href={song}
              target="_blank"
              rel="noreferrer"
              aria-label="Escuchar Vals de amor de Joan Sebastian en YouTube"
            >
              Escuchar en YouTube <Arrow />
            </a>
          </div>
        </section>
        <section id="asistencia" className="scene closing">
          <div className="garden" aria-hidden="true" />
          <div className="closing-content">
            <p className="eyebrow">04 / EL MEJOR RECUERDO SERÁ TENERTE AQUÍ</p>
            <Flourish />
            <h2>
              ¿Me acompañas
              <br />a <em>soñar?</em>
            </h2>
            <p>
              Hay personas que hacen que los momentos
              <br />
              se conviertan en recuerdos inolvidables.
              <br />
              Me encantaría que fueras parte de este.
            </p>
            <a
              className="button light"
              href={rsvp}
              target="_blank"
              rel="noreferrer"
              aria-describedby="rsvp-deadline"
            >
              Confirmar asistencia <span aria-hidden="true">↗</span>
            </a>
            <p id="rsvp-deadline" className="small-note">
              Confirma por WhatsApp hasta el 10 de octubre de 2026.
              <br />
              +57 312 545 4520 · Envía tu nombre para confirmar.
            </p>
            <div className="signature">
              Con cariño,<strong>María Paula</strong>
            </div>
            <span className="closing-date">17 · OCTUBRE · 2026</span>
          </div>
          <footer>
            UNA NOCHE BAJO LA LUNA <span>✧</span> MIS QUINCE AÑOS
          </footer>
        </section>
      </main>
      <dialog
        ref={dialog}
        className="photo-dialog"
        onCancel={(e) => {
          e.preventDefault();
          closePhoto();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePhoto();
        }}
        aria-label="Recuerdos de María Paula"
      >
        <button
          className="close-dialog"
          onClick={closePhoto}
          aria-label="Cerrar fotografía"
        >
          ×
        </button>
        {selected !== null && (
          <>
            <img
              src={"/photos/recuerdo-" + photos[selected] + ".webp"}
              alt={"Recuerdo de infancia de María Paula " + (selected + 1)}
            />
            <div className="dialog-controls">
              <button
                onClick={() =>
                  setSelected((selected + photos.length - 1) % photos.length)
                }
                aria-label="Fotografía anterior"
              >
                ←
              </button>
              <span>
                {selected + 1} / {photos.length}
              </span>
              <button
                onClick={() => setSelected((selected + 1) % photos.length)}
                aria-label="Fotografía siguiente"
              >
                →
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
