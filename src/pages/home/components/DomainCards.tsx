import type React from 'react';
import { useState, useRef } from 'react';

export interface DomainCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  iconClass?: string;
}

interface DomainCardsProps {
  cards: DomainCard[];
  selectedCardId: number;
  onCardSelect: (cardId: number) => void;
}

const DomainCards: React.FC<DomainCardsProps> = ({
  cards,
  selectedCardId,
  onCardSelect,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    const newIndex = (selectedCardId + 1) % cards.length;
    onCardSelect(newIndex);
  };

  const prevCard = () => {
    const newIndex = (selectedCardId - 1 + cards.length) % cards.length;
    onCardSelect(newIndex);
  };

  const goToCard = (index: number) => {
    onCardSelect(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  const handleCardClick = (cardId: number) => {
    onCardSelect?.(cardId);
  };

  const getCardClassName = (card: DomainCard) => {
    const isSelected = selectedCardId === card.id;
    const baseClasses =
      'flex justify-center items-center  md:h-64 p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg';
    const colorClasses = isSelected
      ? `${card.bgColor} border-blue-500 shadow-md`
      : `bg-white border-gray-200 ${card.hoverColor} border-gray-300 ${card.borderColor}`;

    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <>
      {/* Domain Cards - Grid for lg+ screens */}
      <div className='hidden lg:grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 md:max-w-4xl max-w-md mx-auto'>
        {cards.map((card) => (
          <div
            key={card.id}
            className={getCardClassName(card)}
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(card.id);
              }
            }}
          >
            <div className='text-center'>
              <div className='text-5xl mb-2 flex justify-center items-center'>
                <img
                  src={card.icon}
                  alt={card.title}
                  className={card.iconClass}
                />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {card.title}
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Domain Cards - Carousel for md and smaller screens */}
      <div className='lg:hidden mb-12'>
        <div className='relative max-w-md mx-auto'>
          {/* Carousel Container */}
          <div
            className='overflow-hidden rounded-2xl'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
          >
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{
                transform: `translateX(-${selectedCardId * 100}%)`,
              }}
            >
              {cards.map((card) => (
                <div key={card.id} className='w-full flex-shrink-0'>
                  <div
                    className={getCardClassName(card)}
                    onClick={() => handleCardClick(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(card.id);
                      }
                    }}
                  >
                    <div className='text-center'>
                      <div className='text-5xl mb-2 flex justify-center items-center'>
                        <img src={card.icon} alt={card.title} />
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 mb-3'>
                        {card.title}
                      </h3>
                      <p className='text-gray-600 text-sm leading-relaxed'>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className='flex justify-center mt-4 space-x-2'>
            {cards.map((card) => (
              <button
                key={card.id}
                type='button'
                onClick={() => goToCard(card.id)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  card.id === selectedCardId ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to ${card.title} card`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainCards;
