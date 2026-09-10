'use client';

import React, { useState } from 'react';
import { Candidate, Position } from '@/types/election';
import { CandidateCard } from './CandidateCard';

interface VotingBoothProps {
  position: Position;
  candidates: Candidate[];
  onSubmitVote: (votes: Record<string, string>) => Promise<void>;
}

export const VotingBooth: React.FC<VotingBoothProps> = ({
  position,
  candidates,
  onSubmitVote,
}) => {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const handleVote = (candidateId: string) => {
    const newSelected = new Set(selectedCandidates);
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId);
    } else if (newSelected.size < position.count) {
      newSelected.add(candidateId);
    }
    setSelectedCandidates(newSelected);
  };

  const handleSubmit = async () => {
    if (selectedCandidates.size !== position.count) {
      alert(`${position.count}人を選択してください`);
      return;
    }

    setIsSubmitting(true);
    try {
      const votes: Record<string, string> = {};
      selectedCandidates.forEach((candidateId) => {
        votes[position.id] = candidateId;
      });
      await onSubmitVote(votes);
      setConfirmationMessage('投票が完了しました！');
      setSelectedCandidates(new Set());
    } catch (error) {
      alert('投票に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{position.name}</h2>
        <p className="text-gray-700">下から{position.count}人を選んでください</p>
        <p className="text-sm text-gray-600 mt-2">現在の選択: {selectedCandidates.size}/{position.count}</p>
      </div>

      {confirmationMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {confirmationMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {candidates
          .filter((c) => c.position === position.name)
          .map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onVote={handleVote}
              isVoting={isSubmitting}
            />
          ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedCandidates.size !== position.count}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? '投票中...' : '投票を確定'}
        </button>
      </div>
    </div>
  );
};
