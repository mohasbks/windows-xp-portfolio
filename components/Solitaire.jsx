"use client";
import React, { useState, useEffect } from "react";
import { playSound } from "@/store/useOSStore";

// --- Game Logic Constants & Helpers ---
const SUITS = ['♠', '♥', '♣', '♦'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const createDeck = () => {
  let deck = [];
  for (let s of SUITS) {
    for (let r of RANKS) {
      deck.push({
        id: `${r}${s}`,
        suit: s,
        rank: r,
        rankValue: RANKS.indexOf(r) + 1,
        color: (s === '♥' || s === '♦') ? 'red' : 'black',
        isFaceUp: false
      });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

export default function Solitaire() {
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [foundations, setFoundations] = useState([[], [], [], []]);
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []]);
  
  const [selectedPile, setSelectedPile] = useState(null); // { type: 'tableau' | 'waste' | 'foundation', index: number, cardIndex?: number }
  const [winStatus, setWinStatus] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    // Check win condition
    if (foundations.every(f => f.length === 13)) {
      setWinStatus(true);
    }
  }, [foundations]);

  const startNewGame = () => {
    let deck = createDeck();
    let newTableau = [[], [], [], [], [], [], []];
    
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        let card = deck.pop();
        if (j === i) card.isFaceUp = true;
        newTableau[i].push(card);
      }
    }
    
    setTableau(newTableau);
    setStock(deck);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setSelectedPile(null);
    setWinStatus(false);
  };

  const handleDrawStock = () => {
    playSound('type');
    setSelectedPile(null);
    if (stock.length > 0) {
      const card = stock[stock.length - 1];
      card.isFaceUp = true;
      setWaste([...waste, card]);
      setStock(stock.slice(0, -1));
    } else {
      // Recycle waste to stock
      let newStock = [...waste].reverse().map(c => ({ ...c, isFaceUp: false }));
      setStock(newStock);
      setWaste([]);
    }
  };

  const isValidMove = (movingCards, targetPileType, targetIndex) => {
    const bottomCard = movingCards[0];
    
    if (targetPileType === 'foundation') {
      if (movingCards.length > 1) return false;
      const foundation = foundations[targetIndex];
      if (foundation.length === 0) {
        return bottomCard.rankValue === 1; // Ace
      } else {
        const topFoundationCard = foundation[foundation.length - 1];
        return bottomCard.suit === topFoundationCard.suit && bottomCard.rankValue === topFoundationCard.rankValue + 1;
      }
    }
    
    if (targetPileType === 'tableau') {
      const tab = tableau[targetIndex];
      if (tab.length === 0) {
        return bottomCard.rankValue === 13; // King
      } else {
        const topTabCard = tab[tab.length - 1];
        return topTabCard.color !== bottomCard.color && bottomCard.rankValue === topTabCard.rankValue - 1;
      }
    }
    return false;
  };

  const executeMove = (targetPileType, targetIndex) => {
    playSound('type');
    if (!selectedPile) return;

    let movingCards = [];
    let newTableau = [...tableau];
    let newWaste = [...waste];
    let newFoundations = [...foundations];

    // Extract moving cards
    if (selectedPile.type === 'waste') {
      movingCards = [waste[waste.length - 1]];
    } else if (selectedPile.type === 'foundation') {
      movingCards = [foundations[selectedPile.index][foundations[selectedPile.index].length - 1]];
    } else if (selectedPile.type === 'tableau') {
      movingCards = tableau[selectedPile.index].slice(selectedPile.cardIndex);
    }

    // Validate move
    if (!isValidMove(movingCards, targetPileType, targetIndex)) {
      setSelectedPile(null); // Invalid drop, deselect
      return;
    }

    // Remove from source
    if (selectedPile.type === 'waste') {
      newWaste.pop();
    } else if (selectedPile.type === 'foundation') {
      newFoundations[selectedPile.index].pop();
    } else if (selectedPile.type === 'tableau') {
      newTableau[selectedPile.index] = newTableau[selectedPile.index].slice(0, selectedPile.cardIndex);
      // Flip new top card if face down
      if (newTableau[selectedPile.index].length > 0) {
        let newTop = newTableau[selectedPile.index][newTableau[selectedPile.index].length - 1];
        if (!newTop.isFaceUp) {
           newTableau[selectedPile.index][newTableau[selectedPile.index].length - 1].isFaceUp = true;
        }
      }
    }

    // Add to target
    if (targetPileType === 'foundation') {
      newFoundations[targetIndex].push(movingCards[0]);
    } else if (targetPileType === 'tableau') {
      newTableau[targetIndex].push(...movingCards);
    }

    setWaste(newWaste);
    setFoundations(newFoundations);
    setTableau(newTableau);
    setSelectedPile(null);
  };

  const handleCardClick = (type, index, cardIndex = -1) => {
    if (winStatus) return;

    // Deselect if clicking the same thing
    if (selectedPile && selectedPile.type === type && selectedPile.index === index && selectedPile.cardIndex === cardIndex) {
      setSelectedPile(null);
      return;
    }

    // If something is already selected, try to move it here (only makes sense if clicking the top of a pile / empty space)
    if (selectedPile) {
      executeMove(type, index);
    } else {
      // If nothing selected, select this card (if it's face up!)
      if (type === 'tableau' && tableau[index][cardIndex] && !tableau[index][cardIndex].isFaceUp) return;
      if (type === 'waste' && waste.length === 0) return;
      if (type === 'foundation' && foundations[index].length === 0) return;
      
      setSelectedPile({ type, index, cardIndex });
    }
  };

  const Card = ({ card, isSelected }) => {
    if (!card) return <div className="w-[60px] h-[85px] border-2 border-dashed border-green-800 rounded mx-auto bg-green-900/40 shadow-inner"></div>;
    
    if (!card.isFaceUp) {
      return (
        <div className={`w-[60px] h-[85px] rounded border border-gray-100 shadow-md overflow-hidden relative cursor-pointer ${isSelected ? 'ring-2 ring-yellow-400 -translate-y-1 z-50' : ''}`}>
           {/* Classic 90s Blue/White Card Back Pattern */}
           <div className="absolute inset-0 bg-blue-700 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.2)_4px,rgba(255,255,255,0.2)_8px)] border-[3px] border-white">
              <div className="absolute inset-1 border border-white/40"></div>
           </div>
        </div>
      );
    }

    return (
      <div className={`w-[60px] h-[85px] bg-white rounded border border-gray-400 shadow-md flex flex-col p-1 relative select-none cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1 scale-105 z-50 shadow-xl' : ''}`}>
         <div className={`text-sm font-bold leading-none ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>{card.rank}</div>
         <div className={`text-xs ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>{card.suit}</div>
         <div className={`absolute bottom-1 right-2 text-3xl opacity-20 ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>{card.suit}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#1b5e20] font-tahoma select-text overflow-hidden">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 p-1 flex gap-2 shrink-0">
        <span className="text-xs hover:bg-[#316ac5] hover:text-white px-2 cursor-pointer" onClick={startNewGame}>Game (New)</span>
        <span className="text-xs hover:bg-[#316ac5] hover:text-white px-2 cursor-pointer">Help</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-6 relative">
         {winStatus && (
           <div className="absolute inset-0 bg-black/60 z-50 flex flex-col items-center justify-center text-white text-center">
             <div className="text-yellow-400 text-6xl mb-4">🏆</div>
             <h2 className="text-3xl font-bold mb-2 text-shadow-md">You Win!</h2>
             <button onClick={startNewGame} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold mt-4 shadow-lg border border-white">Play Again</button>
           </div>
         )}
         
         {/* Top Row: Stock, Waste, Foundations */}
         <div className="flex justify-between">
            <div className="flex gap-4">
              {/* Stock */}
              <div className="cursor-pointer hover:brightness-110 active:scale-95" onClick={handleDrawStock}>
                 {stock.length > 0 ? <Card card={{ isFaceUp: false }} /> : <div className="w-[60px] h-[85px] border-2 border-dashed border-green-800 rounded bg-green-900/30 flex items-center justify-center text-green-800 text-2xl font-bold">↻</div>}
              </div>
              {/* Waste */}
              <div 
                 className="cursor-pointer relative" 
                 onClick={() => handleCardClick('waste', 0, waste.length - 1)}
              >
                 {waste.length > 0 ? (
                   <>
                     {waste.slice(-3).map((card, i, arr) => (
                       <div key={card.id} className="absolute top-0" style={{ left: i * 15, zIndex: i }}>
                         <Card card={card} isSelected={selectedPile?.type === 'waste' && i === arr.length - 1} />
                       </div>
                     ))}
                     {/* Dummy div to allocate space for absolute positioning */}
                     <div className="w-[60px] h-[85px] invisible" style={{ marginLeft: Math.min(2, waste.length - 1) * 15 }}></div>
                   </>
                 ) : <Card card={null} />}
              </div>
            </div>

            {/* Foundations */}
            <div className="flex gap-4">
               {foundations.map((f, i) => (
                 <div key={i} className="cursor-pointer" onClick={() => handleCardClick('foundation', i)}>
                    {f.length > 0 ? (
                      <Card card={f[f.length - 1]} isSelected={selectedPile?.type === 'foundation' && selectedPile.index === i} />
                    ) : (
                      <div className="w-[60px] h-[85px] border-2 border-dashed border-green-800 rounded text-green-900/30 flex flex-col justify-center items-center text-2xl font-bold font-serif opacity-30 shadow-inner bg-green-900/10 text-shadow">
                        A
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>

         {/* Bottom Row: Tableau */}
         <div className="flex justify-between mt-2 flex-1 relative">
            {tableau.map((tab, i) => (
              <div key={i} className="relative w-[60px] cursor-pointer" onClick={() => tab.length === 0 && handleCardClick('tableau', i, 0)}>
                 {tab.length === 0 ? (
                   <Card card={null} />
                 ) : (
                   tab.map((card, j) => (
                     <div 
                       key={card.id} 
                       className="absolute w-full top-0" 
                       style={{ top: j * 15, zIndex: j }}
                       onClick={(e) => { e.stopPropagation(); handleCardClick('tableau', i, j); }}
                     >
                       <Card 
                          card={card} 
                          isSelected={selectedPile?.type === 'tableau' && selectedPile.index === i && j >= selectedPile.cardIndex} 
                       />
                     </div>
                   ))
                 )}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
