import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type IconBtnProps = {
    icon: LucideIcon,
    onClick?: () => void,
    className?: string,
}

const IconBtn = ({ icon: Icon, onClick, className }: IconBtnProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -8, 8, 0],
                transition: { duration: 0.4 }
            }}
            whileTap={{scale: 0.9}}
            className={className}
        >
            <Icon size={20} />
        </motion.button>
    )
}

export default IconBtn;