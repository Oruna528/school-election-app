'use client';

import React, { useState } from 'react';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 簡易認証（本番環境では適切な認証システムを使用してください）
    if (studentId && password.length >= 4) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('学生証番号とパスワードを入力してください');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">生徒会選挙</h1>
          <p className="text-gray-600 text-center mb-8">オンライン投票システム</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="studentId" className="block text-gray-700 font-semibold mb-2">
                学生証番号
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="例: 12345"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="パスワード"
              />
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              ログイン
            </button>
          </form>
          
          <p className="text-center text-gray-600 text-sm mt-6">
            テスト用: 任意の学生証番号と4文字以上のパスワード
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">生徒会選挙へようこそ</h1>
        <p className="text-lg text-gray-700 mb-8">学生ID: {studentId}</p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <p className="text-gray-800">
            💡 このデモアプリケーションはセットアップ中です。
          </p>
          <p className="text-gray-600 text-sm mt-2">
            候補者情報と投票機能は管理パネルから設定できます。
          </p>
        </div>
        
        <button
          onClick={() => setAuthenticated(false)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Home;
