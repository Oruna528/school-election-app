'use client';

import React from 'react';
import { Candidate } from '@/types/election';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: string) => void;
  isVoting: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onVote,
  isVoting,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {candidate.imageUrl && (
        <img
          src={candidate.imageUrl}
          alt={candidate.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{candidate.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{candidate.grade}年 {candidate.class}組</p>
      <p className="text-sm text-blue-600 font-semibold mb-4">{candidate.position}</p>
      
      <div className="bg-gray-50 p-4 rounded mb-4 min-h-20">
        <p className="text-gray-700 text-sm leading-relaxed">{candidate.platformStatement}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{candidate.votes}</p>
          <p className="text-xs text-gray-600">投票数</p>
        </div>
        
        <button
          onClick={() => onVote(candidate.id)}
          disabled={isVoting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {isVoting ? '投票中...' : '投票'}
        </button>
      </div>
    </div>
  );
};
