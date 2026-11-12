import { ROADMAP_WEEKS } from '../data/roadmapData';

/**
 * Formats a Date to iCalendar UTC format: YYYYMMDDTHHMMSSZ
 */
function formatIcsDate(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

/**
 * Generates an RFC 5545 compliant .ics calendar file containing all 6 weeks of study blocks.
 */
export function generateRoadmapIcs(startDate: Date = new Date()): string {
  const now = new Date();
  const dtStamp = formatIcsDate(now);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Seed & Grow//Cronograma de 6 Semanas Dev//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Cronograma 6 Semanas: De la Facultad a Producción',
    'X-WR-TIMEZONE:America/Argentina/Buenos_Aires',
    'X-WR-CALDESC:Plan intensivo de 6 semanas para estudiantes de Ingeniería en Sistemas para pasar de la teoría a crear apps reales en producción.',
  ];

  ROADMAP_WEEKS.forEach((week) => {
    // Event: Weekly Kickoff & Deep Work Session
    const eventStart = new Date(startDate.getTime() + week.calendarEvent.startDateOffsetDays * 24 * 60 * 60 * 1000);
    // Set to 18:00 (6 PM after classes/work)
    eventStart.setHours(18, 0, 0, 0);
    const eventEnd = new Date(eventStart.getTime() + week.calendarEvent.durationHours * 60 * 60 * 1000);

    const uid = `seedgrow-week-${week.weekNumber}-${eventStart.getTime()}@seedgrow.coop`;

    const cleanDescription = `${week.tagline}\\n\\n` +
      `PUENTE CON LA FACULTAD:\\n${week.facultyBridge}\\n\\n` +
      `PLAN DE ESTUDIO DIARIO:\\n` +
      week.dailySchedule.map((d) => `• ${d.day}: ${d.topic} -> Práctica: ${d.practice}`).join('\\n') +
      `\\n\\nOBJETIVO ENTREGABLE:\\n${week.milestoneProject}\\n\\n` +
      `HERRAMIENTAS CLAVE:\\n${week.keyTools.join(', ')}`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${formatIcsDate(eventStart)}`,
      `DTEND:${formatIcsDate(eventEnd)}`,
      `SUMMARY:${week.calendarEvent.summary}`,
      `DESCRIPTION:${cleanDescription}`,
      'LOCATION:Entorno de Desarrollo / VS Code',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Recordatorio: ${week.calendarEvent.summary}`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Triggers a browser download of the generated .ics file.
 */
export function downloadRoadmapIcsFile(startDate: Date = new Date()): void {
  const icsContent = generateRoadmapIcs(startDate);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'cronograma_6_semanas_facultad_a_produccion.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
