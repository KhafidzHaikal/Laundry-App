export default function SuccessBadge({ className = '', disabled, children, ...props }) {
    return (
        <div
            {...props}
            className={
                `inline-flex items-center px-1 py-1 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white capitalize ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </div>
    );
}

