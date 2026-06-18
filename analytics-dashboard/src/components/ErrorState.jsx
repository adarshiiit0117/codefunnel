import { MdErrorOutline, MdRefresh } from "react-icons/md";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
        <MdErrorOutline className="text-3xl text-red-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-200">Request failed</p>
        <p className="mt-1 text-xs text-slate-500 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary bg-slate-700 hover:bg-slate-600">
          <MdRefresh className="text-base" />
          Retry
        </button>
      )}
    </div>
  );
}
