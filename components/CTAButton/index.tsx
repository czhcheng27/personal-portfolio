import Image from "next/image";
import styles from "./index.module.css";

interface CTAButtonProps {
    text: string;
    className?: string;
    id?: string;
}

const CTAButton = ({ text, className, id }: CTAButtonProps) => {
    return (
        <a
            onClick={(e) => {
                e.preventDefault();

                const target = id ? document.getElementById(id) : null;

                if (target) {
                    const offset = window.innerHeight * 0.15;
                    const top =
                        target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({ top, behavior: "smooth" });
                }
            }}
            className={`${styles.ctaWrapper} ${className ?? ""}`}
        >
            <div className={`${styles.ctaButton} group`}>
                <div className={styles.bgCircle} />
                <p className={styles.text}>{text}</p>
                <div className={styles.arrowWrapper}>
                    <Image
                        src="/assets/arrow-down.svg"
                        alt="arrow icon"
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </div>
        </a>
    );
};

export default CTAButton;