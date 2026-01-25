"use client";

import { useRef } from "react";
import { ExpCard } from "@/constants";

interface GlowCardProps {
  card: ExpCard;
  children?: React.ReactNode;
}

const HoverGlowCard = ({ card, children }: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable
    card.style.setProperty("--start", String(angle + 60));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      <div className="glow"></div>
      <div className="mb-5 space-y-1">
        <p className="text-white-50 text-lg">{card.review1}</p>
        <p className="text-white-50 text-lg">{card.review2}</p>
        <p className="text-white-50 text-lg">{card.review3}</p>
        <p className="text-white-50 text-lg">{card.review4}</p>
      </div>
      {children}
    </div>
  );
};

export default HoverGlowCard;
