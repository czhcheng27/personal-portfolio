import { forwardRef } from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={`mx-auto max-w-8xl flex-center mt-20 md:mt-40 
            px-4 sm:px-6 md:px-12 overflow-hidden
            ${className}`}
        {...rest}
      >
        {children}
      </section>
    );
  }
);

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
