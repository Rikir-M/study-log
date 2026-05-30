type BtnProps = {
    onClick?: () => void;
    bgColor?: string;
    textColor?: string;
    label: string;
};

export default function Button({ onClick, bgColor, textColor, label }: BtnProps) {
    return (
        <button 
            className={`px-4 py-2 rounded-2xl ${bgColor || 'bg-primary'} ${textColor || 'text-white'}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
}