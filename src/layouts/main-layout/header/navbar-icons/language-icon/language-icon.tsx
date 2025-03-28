import LanguageDropdown from "./language-icon-dropdown"

export default function LanguageIcon() {
    return (
        <div className="flex flex-col items-center justify-around gap-3 sm:flex-row sm:gap-0 md:gap-3">
            <LanguageDropdown />
        </div>
    )
}
