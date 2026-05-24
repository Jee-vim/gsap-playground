export default function Rerender({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute z-10 right-2 bottom-2 flex items-center justify-center">
      <button type="button" onClick={onClick} className="bg-accent rounded-full p-2 size-10 text-xs text-bg font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw-icon lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
      </button>
    </div>
  )
}
