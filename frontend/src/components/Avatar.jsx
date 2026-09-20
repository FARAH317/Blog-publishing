const color=['var(--color-wine)', 'var(--color-brass)', 'var(--color-slate)'];
const getInitials=(name)=> {
  if (!name) return '?';
  const parts=name.trim().split(/\s+/);
  const initials=parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase();
};
const getColorForName=(name)=> {
  const charSum=(name || '').split('').reduce((sum, char)=> sum + char.charCodeAt(0), 0);
  return color[charSum % color.length];
};
const Avatar=({ name })=> {
  return (
    <span className="avatar" style={{ backgroundColor: getColorForName(name) }}>
      {getInitials(name)}
    </span>
  );
};
export default Avatar;
