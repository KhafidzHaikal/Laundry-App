export default function WarningBadge({ className = '', disabled, children, ...props }) {
    return (
        <div
            {...props}
            className={
                `inline-flex items-center px-1 py-1 bg-orange-300 border border-transparent rounded-md font-semibold text-xs text-white capitalize ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </div>
    );
}

