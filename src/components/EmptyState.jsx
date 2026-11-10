import { Link } from 'react-router-dom'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-forest-900/15 bg-white/50 px-6 py-16 text-center">
      {Icon && (
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-50 text-forest-600">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
      )}
      <h3 className="mt-5 font-display text-xl font-semibold text-forest-950">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest-900/70">{description}</p>
      )}
      {actionLabel &&
        (actionTo ? (
          <Link to={actionTo} className="btn btn-primary mt-6 h-11 px-5">
            {actionLabel}
          </Link>
        ) : (
          <button type="button" onClick={onAction} className="btn btn-primary mt-6 h-11 px-5">
            {actionLabel}
          </button>
        ))}
    </div>
  )
}
