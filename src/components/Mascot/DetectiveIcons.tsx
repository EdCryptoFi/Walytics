export function IconHat({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16c0-3 4-6 9-6s9 3 9 6" fill={color} fillOpacity="0.15" />
      <path d="M3 16h18" />
      <path d="M6 10c0-2 .5-3 1.5-3M18 10c0-2-.5-3-1.5-3" />
      <ellipse cx="12" cy="6" rx="1.5" ry="1" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

export function IconPipe({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14c0 2 1.5 3 4 3h4c2 0 3-1.5 3-3v-2H3z" fill={color} fillOpacity="0.15" />
      <path d="M14 12h3c2 0 3.5-1.5 3.5-3.5S19 5 17 5" />
      <circle cx="20" cy="6" r="1.2" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

export function IconLoupe({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5L20 20" strokeWidth="2.8" />
      <path d="M7 9c.6-1.5 2-2 3-2" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function IconWatch({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="13" r="7" />
      <path d="M12 4v3M10 4h4" />
      <path d="M12 9v4l3 2" strokeWidth="2" />
    </svg>
  );
}

export function IconKey({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="12" r="3.5" />
      <path d="M10 12h11M16 12v3M19 12v2" />
    </svg>
  );
}

export function IconBook({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5c2-1 5-1 8 0v15c-3-1-6-1-8 0z" fill={color} fillOpacity="0.12"/>
      <path d="M12 5c3-1 6-1 8 0v15c-2-1-5-1-8 0z" fill={color} fillOpacity="0.12"/>
      <path d="M12 5v15" />
    </svg>
  );
}

export function IconCompass({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 5-4 1 2-5z" fill={color} fillOpacity="0.4"/>
      <circle cx="12" cy="12" r="1" fill={color}/>
    </svg>
  );
}

export function IconFootprint({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <ellipse cx="11" cy="13" rx="4.5" ry="6"/>
      <circle cx="6" cy="6" r="1.6"/>
      <circle cx="10" cy="4" r="1.4"/>
      <circle cx="14" cy="4.5" r="1.4"/>
      <circle cx="17" cy="7" r="1.6"/>
    </svg>
  );
}

export function IconTusk({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M9 3c-1 5-2 12-3 18 0 1 2 1 3 0 1-5 2-12 3-18z" fill={color} fillOpacity="0.2"/>
      <path d="M15 3c1 5 2 12 3 18 0 1-2 1-3 0-1-5-2-12-3-18z" fill={color} fillOpacity="0.2"/>
    </svg>
  );
}

export function IconMagnify({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="10" cy="10" r="5.5" fill={color} fillOpacity="0.08"/>
      <path d="M14 14l5.5 5.5" strokeWidth="3"/>
      <path d="M3 10h1M2 14h1.5M3 18h1" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

export function IconChat({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H9l-4 4z" fill={color} fillOpacity="0.12"/>
      <circle cx="9" cy="10" r="0.8" fill={color}/>
      <circle cx="12" cy="10" r="0.8" fill={color}/>
      <circle cx="15" cy="10" r="0.8" fill={color}/>
    </svg>
  );
}
